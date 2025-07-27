import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import TempleCard from '../components/TempleCard';
import { fetchAllTemples } from '../services/api';

function Home() {
  const [featuredTemples, setFeaturedTemples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFeaturedTemples = async () => {
      try {
        setLoading(true);
        const response = await fetchAllTemples(null, null, null, 6);
        setFeaturedTemples(response.temples);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedTemples();
  }, []);

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem',
        padding: '3rem 1rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: '700',
          color: '#2c3e50',
          margin: '0 0 1rem 0',
          lineHeight: '1.2'
        }}>
          Discover India's Sacred Heritage
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          color: '#7f8c8d',
          margin: '0 0 2rem 0',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          lineHeight: '1.6'
        }}>
          Explore thousands of temples across India using natural language queries. 
          Find temples by deity, location, architecture, or historical significance.
        </p>

        <SearchBar />
      </div>

      {/* Example Queries */}
      <div style={{
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '2rem',
        marginBottom: '3rem'
      }}>
        <h3 style={{
          fontSize: '1.3rem',
          fontWeight: '600',
          color: '#2c3e50',
          margin: '0 0 1rem 0',
          textAlign: 'center'
        }}>
          Try these example searches:
        </h3>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center'
        }}>
          {[
            "Shiva temples in Tamil Nadu",
            "Ancient temples in North India",
            "UNESCO World Heritage temples",
            "Dravidian architecture temples",
            "Jyotirlinga temples",
            "Famous Vishnu temples"
          ].map((query, index) => (
            <button
              key={index}
              onClick={() => window.location.href = `/search?q=${encodeURIComponent(query)}`}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: '#ffffff',
                border: '1px solid #e1e5e9',
                borderRadius: '20px',
                color: '#3498db',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '500',
                transition: 'all 0.2s',
                fontFamily: 'inherit'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#3498db';
                e.target.style.color = '#ffffff';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#ffffff';
                e.target.style.color = '#3498db';
              }}
            >
              {query}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Temples */}
      <div>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: '600',
          color: '#2c3e50',
          margin: '0 0 2rem 0',
          textAlign: 'center'
        }}>
          Featured Temples
        </h2>

        {loading && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#7f8c8d'
          }}>
            Loading featured temples...
          </div>
        )}

        {error && (
          <div style={{
            textAlign: 'center',
            padding: '2rem',
            color: '#e74c3c',
            backgroundColor: '#fdf2f2',
            borderRadius: '8px',
            border: '1px solid #fecaca'
          }}>
            Error loading temples: {error}
          </div>
        )}

        {!loading && !error && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            {featuredTemples.map((temple) => (
              <TempleCard key={temple.id} temple={temple} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
