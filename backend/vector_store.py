"""
Vector store management for temple search using FAISS
Handles embedding generation and similarity search
"""

import numpy as np
import faiss
from typing import List, Tuple
from temple_data import get_all_temples, get_temple_text_for_embedding

class SimpleEmbedding:
    """Simple embedding class that creates basic text embeddings"""
    
    def __init__(self, dimension=384):
        self.dimension = dimension
        # Simple vocabulary for basic embedding simulation
        self.vocab = {}
        self._build_vocab()
    
    def _build_vocab(self):
        """Build vocabulary from temple data"""
        temples = get_all_temples()
        words = set()
        
        for temple in temples:
            text = get_temple_text_for_embedding(temple).lower()
            words.update(text.split())
        
        # Add common temple-related words
        temple_words = [
            'temple', 'shiva', 'vishnu', 'parvati', 'ancient', 'medieval', 'modern',
            'dravidian', 'north', 'south', 'india', 'pilgrimage', 'heritage', 'jyotirlinga',
            'tamil', 'nadu', 'uttar', 'pradesh', 'gujarat', 'punjab', 'odisha', 'kerala',
            'karnataka', 'rajasthan', 'maharashtra', 'andhra', 'telangana', 'bihar',
            'jharkhand', 'chhattisgarh', 'madhya', 'himachal', 'uttarakhand', 'haryana',
            'delhi', 'goa', 'assam', 'bengal', 'tripura', 'manipur', 'nagaland', 'mizoram'
        ]
        
        words.update(temple_words)
        
        for i, word in enumerate(sorted(words)):
            self.vocab[word] = i
    
    def embed_text(self, text: str) -> np.ndarray:
        """Create a simple embedding for text"""
        words = text.lower().split()
        embedding = np.zeros(self.dimension)
        
        # Simple bag-of-words with position encoding
        for i, word in enumerate(words):
            if word in self.vocab:
                idx = self.vocab[word] % self.dimension
                embedding[idx] += 1.0 / (i + 1)  # Position weighting
        
        # Add some randomness for better separation
        noise = np.random.normal(0, 0.1, self.dimension)
        embedding += noise
        
        # Normalize
        norm = np.linalg.norm(embedding)
        if norm > 0:
            embedding = embedding / norm
        
        return embedding.astype(np.float32)

class TempleVectorStore:
    """Vector store for temple search using FAISS"""
    
    def __init__(self):
        self.embedding_model = SimpleEmbedding()
        self.index = None
        self.temple_ids = []
        self.temples_data = []
        self._build_index()
    
    def _build_index(self):
        """Build FAISS index from temple data"""
        temples = get_all_temples()
        embeddings = []
        
        for temple in temples:
            text = get_temple_text_for_embedding(temple)
            embedding = self.embedding_model.embed_text(text)
            embeddings.append(embedding)
            self.temple_ids.append(temple['id'])
            self.temples_data.append(temple)
        
        # Create FAISS index
        embeddings_array = np.array(embeddings)
        dimension = embeddings_array.shape[1]
        
        self.index = faiss.IndexFlatIP(dimension)  # Inner product for cosine similarity
        self.index.add(embeddings_array)
    
    def search(self, query: str, top_k: int = 5) -> List[Tuple[dict, float]]:
        """Search for temples similar to the query"""
        if not self.index:
            return []
        
        # Create embedding for query
        query_embedding = self.embedding_model.embed_text(query)
        query_embedding = query_embedding.reshape(1, -1)
        
        # Search in FAISS index
        scores, indices = self.index.search(query_embedding, min(top_k, len(self.temples_data)))
        
        results = []
        for score, idx in zip(scores[0], indices[0]):
            if idx < len(self.temples_data):
                temple = self.temples_data[idx]
                results.append((temple, float(score)))
        
        return results
    
    def search_with_filters(self, query: str, filters: dict = None, top_k: int = 5) -> List[Tuple[dict, float]]:
        """Search with additional filters"""
        # First get vector search results
        vector_results = self.search(query, top_k * 2)  # Get more results to filter
        
        if not filters:
            return vector_results[:top_k]
        
        # Apply filters
        filtered_results = []
        for temple, score in vector_results:
            include = True
            
            if filters.get('state') and temple['state'].lower() != filters['state'].lower():
                include = False
            
            if filters.get('deity') and temple['deity'].lower() != filters['deity'].lower():
                include = False
            
            if filters.get('era') and temple['era'].lower() != filters['era'].lower():
                include = False
            
            if include:
                filtered_results.append((temple, score))
        
        return filtered_results[:top_k]

# Global vector store instance
vector_store = TempleVectorStore()

def search_temples_vector(query: str, filters: dict = None, top_k: int = 5) -> List[Tuple[dict, float]]:
    """Main function to search temples using vector similarity"""
    return vector_store.search_with_filters(query, filters, top_k)
