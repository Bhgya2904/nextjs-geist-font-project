"""
FastAPI backend for TempleSeeker AI
Provides endpoints for temple search and data retrieval
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional
import uvicorn

from temple_data import get_all_temples, get_temple_by_id, search_temples_by_filters
from langchain_tool import process_query, get_query_suggestions
from vector_store import search_temples_vector

# Initialize FastAPI app
app = FastAPI(
    title="TempleSeeker AI API",
    description="Backend API for finding Indian temples using natural language queries",
    version="1.0.0"
)

# Add CORS middleware to allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8000"],  # Next.js dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request/response
class QueryRequest(BaseModel):
    query: str
    filters: Optional[Dict] = {}
    limit: Optional[int] = 8

class QueryResponse(BaseModel):
    results: List[Dict]
    total_results: int
    query_processed: str

class TempleResponse(BaseModel):
    temple: Dict

class TemplesResponse(BaseModel):
    temples: List[Dict]
    total_count: int

class SuggestionsResponse(BaseModel):
    suggestions: List[str]

# Health check endpoint
@app.get("/")
async def root():
    return {
        "message": "TempleSeeker AI API is running",
        "version": "1.0.0",
        "endpoints": ["/query", "/temples", "/temple/{id}", "/suggestions"]
    }

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "TempleSeeker AI API"}

# Main query endpoint - processes natural language queries
@app.post("/query", response_model=QueryResponse)
async def query_temples(request: QueryRequest):
    """
    Process natural language query to find matching temples
    
    Example queries:
    - "Shiva temples in Tamil Nadu"
    - "Ancient temples in North India"
    - "Famous Vishnu temples"
    """
    try:
        if not request.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        # Process query using LangChain-like functionality
        results = process_query(request.query, request.filters)
        
        # Limit results
        limited_results = results[:request.limit] if request.limit else results
        
        return QueryResponse(
            results=limited_results,
            total_results=len(results),
            query_processed=request.query
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing query: {str(e)}")

# Get all temples
@app.get("/temples", response_model=TemplesResponse)
async def list_temples(
    state: Optional[str] = None,
    deity: Optional[str] = None,
    era: Optional[str] = None,
    limit: Optional[int] = None
):
    """
    Get all temples with optional filtering
    
    Query parameters:
    - state: Filter by state (e.g., "Tamil Nadu")
    - deity: Filter by deity (e.g., "Shiva")
    - era: Filter by era (e.g., "Ancient")
    - limit: Limit number of results
    """
    try:
        # Apply filters if provided
        if state or deity or era:
            temples = search_temples_by_filters(state=state, deity=deity, era=era)
        else:
            temples = get_all_temples()
        
        # Apply limit
        if limit:
            temples = temples[:limit]
        
        return TemplesResponse(
            temples=temples,
            total_count=len(temples)
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching temples: {str(e)}")

# Get specific temple by ID
@app.get("/temple/{temple_id}", response_model=TempleResponse)
async def get_temple_detail(temple_id: int):
    """
    Get detailed information about a specific temple
    """
    try:
        temple = get_temple_by_id(temple_id)
        
        if not temple:
            raise HTTPException(status_code=404, detail=f"Temple with ID {temple_id} not found")
        
        return TempleResponse(temple=temple)
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching temple: {str(e)}")

# Get query suggestions
@app.get("/suggestions", response_model=SuggestionsResponse)
async def get_suggestions(q: Optional[str] = None):
    """
    Get query suggestions for autocomplete
    
    Query parameter:
    - q: Partial query for filtering suggestions
    """
    try:
        suggestions = get_query_suggestions(q)
        return SuggestionsResponse(suggestions=suggestions)
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting suggestions: {str(e)}")

# Vector search endpoint (for advanced users)
@app.post("/search/vector")
async def vector_search(request: QueryRequest):
    """
    Direct vector search endpoint for advanced queries
    """
    try:
        if not request.query.strip():
            raise HTTPException(status_code=400, detail="Query cannot be empty")
        
        results = search_temples_vector(request.query, request.filters, request.limit or 5)
        
        formatted_results = []
        for temple, score in results:
            formatted_results.append({
                "temple": temple,
                "similarity_score": round(score, 3)
            })
        
        return {
            "results": formatted_results,
            "total_results": len(formatted_results),
            "search_type": "vector_similarity"
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error in vector search: {str(e)}")

# Get temple statistics
@app.get("/stats")
async def get_temple_stats():
    """
    Get statistics about the temple dataset
    """
    try:
        temples = get_all_temples()
        
        # Calculate statistics
        states = {}
        deities = {}
        eras = {}
        
        for temple in temples:
            # Count by state
            state = temple['state']
            states[state] = states.get(state, 0) + 1
            
            # Count by deity
            deity = temple['deity']
            deities[deity] = deities.get(deity, 0) + 1
            
            # Count by era
            era = temple['era']
            eras[era] = eras.get(era, 0) + 1
        
        return {
            "total_temples": len(temples),
            "by_state": states,
            "by_deity": deities,
            "by_era": eras
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error getting stats: {str(e)}")

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)
