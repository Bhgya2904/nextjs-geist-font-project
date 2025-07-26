"""
LangChain integration for natural language query processing
Simulates GPT-4 agent functionality for temple search
"""

import re
from typing import Dict, List, Tuple
from vector_store import search_temples_vector

class TempleQueryProcessor:
    """Processes natural language queries about temples"""
    
    def __init__(self):
        # Keywords for different categories
        self.deity_keywords = {
            'shiva': ['shiva', 'shiv', 'mahadev', 'bholenath', 'rudra', 'nataraja'],
            'vishnu': ['vishnu', 'narayana', 'hari', 'krishna', 'rama', 'venkateswara', 'balaji', 'jagannath', 'badrinath'],
            'parvati': ['parvati', 'devi', 'durga', 'kali', 'meenakshi', 'goddess'],
            'surya': ['surya', 'sun', 'aditya'],
            'guru nanak': ['guru', 'nanak', 'sikh', 'gurdwara']
        }
        
        self.state_keywords = {
            'tamil nadu': ['tamil', 'nadu', 'tn'],
            'uttar pradesh': ['uttar', 'pradesh', 'up'],
            'gujarat': ['gujarat', 'guj'],
            'punjab': ['punjab', 'pb'],
            'odisha': ['odisha', 'orissa'],
            'andhra pradesh': ['andhra', 'pradesh', 'ap'],
            'uttarakhand': ['uttarakhand', 'uk']
        }
        
        self.era_keywords = {
            'ancient': ['ancient', 'old', 'historic', 'historical'],
            'medieval': ['medieval', 'middle', 'chola', 'pallava'],
            'modern': ['modern', 'new', 'recent']
        }
        
        self.region_keywords = {
            'north india': ['north', 'northern', 'himalaya', 'himalayas'],
            'south india': ['south', 'southern', 'dravidian'],
            'west india': ['west', 'western'],
            'east india': ['east', 'eastern']
        }
    
    def extract_filters(self, query: str) -> Dict:
        """Extract filters from natural language query"""
        query_lower = query.lower()
        filters = {}
        
        # Extract deity
        for deity, keywords in self.deity_keywords.items():
            if any(keyword in query_lower for keyword in keywords):
                filters['deity'] = deity.title()
                break
        
        # Extract state
        for state, keywords in self.state_keywords.items():
            if any(keyword in query_lower for keyword in keywords):
                filters['state'] = state.title()
                break
        
        # Extract era
        for era, keywords in self.era_keywords.items():
            if any(keyword in query_lower for keyword in keywords):
                filters['era'] = era.title()
                break
        
        return filters
    
    def enhance_query(self, query: str) -> str:
        """Enhance query with relevant temple search terms"""
        query_lower = query.lower()
        enhanced_terms = []
        
        # Add temple-specific terms based on query content
        if any(word in query_lower for word in ['famous', 'popular', 'important']):
            enhanced_terms.append('pilgrimage heritage significance')
        
        if any(word in query_lower for word in ['ancient', 'old', 'historic']):
            enhanced_terms.append('ancient heritage historical')
        
        if any(word in query_lower for word in ['architecture', 'beautiful', 'carved']):
            enhanced_terms.append('architecture dravidian carved sculpture')
        
        enhanced_query = query
        if enhanced_terms:
            enhanced_query += ' ' + ' '.join(enhanced_terms)
        
        return enhanced_query
    
    def process_query(self, query: str, filters: Dict = None) -> List[Dict]:
        """
        Main function to process natural language query
        Simulates LangChain agent functionality
        """
        try:
            # Extract filters from query if not provided
            if not filters:
                filters = self.extract_filters(query)
            
            # Enhance query for better search
            enhanced_query = self.enhance_query(query)
            
            # Search using vector store
            results = search_temples_vector(enhanced_query, filters, top_k=8)
            
            # Format results
            formatted_results = []
            for temple, score in results:
                formatted_results.append({
                    'temple': temple,
                    'relevance_score': round(score, 3),
                    'match_reason': self._generate_match_reason(query, temple, filters)
                })
            
            return formatted_results
            
        except Exception as e:
            print(f"Error processing query: {e}")
            return []
    
    def _generate_match_reason(self, query: str, temple: Dict, filters: Dict) -> str:
        """Generate explanation for why this temple matches the query"""
        reasons = []
        
        query_lower = query.lower()
        
        # Check deity match
        if temple['deity'].lower() in query_lower:
            reasons.append(f"Dedicated to {temple['deity']}")
        
        # Check location match
        if temple['state'].lower() in query_lower or temple['city'].lower() in query_lower:
            reasons.append(f"Located in {temple['city']}, {temple['state']}")
        
        # Check era match
        if temple['era'].lower() in query_lower:
            reasons.append(f"{temple['era']} period temple")
        
        # Check significance
        if 'significance' in temple and temple['significance']:
            if any(word in query_lower for word in ['famous', 'important', 'heritage']):
                reasons.append(temple['significance'])
        
        # Default reason
        if not reasons:
            reasons.append("Matches search criteria")
        
        return "; ".join(reasons)

# Global processor instance
query_processor = TempleQueryProcessor()

def process_query(query_text: str, filters: Dict = None) -> List[Dict]:
    """Main function to process temple queries"""
    return query_processor.process_query(query_text, filters)

def get_query_suggestions(partial_query: str) -> List[str]:
    """Generate query suggestions based on partial input"""
    suggestions = [
        "Shiva temples in Tamil Nadu",
        "Ancient temples in North India",
        "Famous Vishnu temples",
        "Heritage temples in Gujarat",
        "Pilgrimage sites in Uttarakhand",
        "Dravidian architecture temples",
        "Jyotirlinga temples",
        "UNESCO World Heritage temples",
        "Medieval period temples",
        "Sun temples in India"
    ]
    
    if partial_query:
        # Filter suggestions based on partial query
        partial_lower = partial_query.lower()
        filtered = [s for s in suggestions if any(word in s.lower() for word in partial_lower.split())]
        return filtered[:5] if filtered else suggestions[:5]
    
    return suggestions[:5]
