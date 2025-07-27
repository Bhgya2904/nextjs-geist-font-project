import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import TempleCard from '../components/TempleCard';
import { searchQuery } from '../services/api';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    try {
      setLoading(true);
      setError(null);
      const response = await searchQuery(searchQuery);
      setResults(response.results);
      setTotalResults(response.total_results);
    } catch (err) {
      setError(err.message);
      setResults([]);
      setTotalResults(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Search Header */}
      <div style={{
        marginBottom: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#2c3e50',
          margin: '0 0 1rem 0'
        }}>
          Search Results
        </h1>
        
        <SearchBar />
        
        {query && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '1px solid #e9ecef'
          }}>
            <p style={{
              margin: 0,
              color: '#666',
              fontSize: '0.95rem'
            }}>
              Showing results for: <strong>"{query}"</strong>
              {totalResults > 0 && (
                <span> ({totalResults} temple{totalResults !== 1 ? 's' : ''} found)</span>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Loading State */}
      {loading && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#7f8c8d'
        }}>
          <div style={{
            fontSize: '1.1rem',
            marginBottom: '1rem'
          }}>
            Searching temples...
          </div>
          <div style={{
            width: '40px',
            height: '40px',
            border: '3px solid #f3f3f3',
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto'
          }}></div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#e74c3c',
          backgroundColor: '#fdf2f2',
          borderRadius: '8px',
          border: '1px solid #fecaca',
          margin: '2rem 0'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Search Error</h3>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      )}

      {/* No Results */}
      {!loading && !error && query && results.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#7f8c8d'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            margin: '0 0 1rem 0'
          }}>
            No temples found
          </h3>
          <p style={{
            margin: '0 0 2rem 0',
            fontSize: '1.1rem'
          }}>
            Try searching with different keywords like:
          </p>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem',
            justifyContent: 'center'
          }}>
            {[
              "Shiva temples",
              "Tamil Nadu",
              "Ancient temples",
              "Vishnu",
              "Heritage sites"
            ].map((suggestion, index) => (
              <button
                key={index}
                onClick={() => window.location.href = `/search?q=${encodeURIComponent(suggestion)}`}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3498db',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  fontWeight: '500',
                  transition: 'background-color 0.2s',
                  fontFamily: 'inherit'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results Grid */}
      {!loading && !error && results.length > 0 && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {results.map((result, index) => (
            <TempleCard 
              key={result.temple.id || index} 
              temple={result.temple}
              showRelevanceScore={true}
              relevanceScore={result.relevance_score}
            />
          ))}
        </div>
      )}

      {/* No Query State */}
      {!query && (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#7f8c8d'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            margin: '0 0 1rem 0'
          }}>
            Enter a search query to find temples
          </h3>
          <p style={{ margin: 0, fontSize: '1.1rem' }}>
            Search by deity, location, architecture, or historical significance
          </p>
        </div>
      )}

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default SearchResults;
