import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchTempleById } from '../services/api';

function TempleDetails() {
  const { id } = useParams();
  const [temple, setTemple] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTemple = async () => {
      try {
        setLoading(true);
        const response = await fetchTempleById(id);
        setTemple(response.temple);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      loadTemple();
    }
  }, [id]);

  if (loading) {
    return (
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          padding: '3rem',
          color: '#7f8c8d'
        }}>
          <div style={{
            fontSize: '1.1rem',
            marginBottom: '1rem'
          }}>
            Loading temple details...
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
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '2rem',
          color: '#e74c3c',
          backgroundColor: '#fdf2f2',
          borderRadius: '8px',
          border: '1px solid #fecaca'
        }}>
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Error Loading Temple</h3>
          <p style={{ margin: '0 0 1rem 0' }}>{error}</p>
          <Link 
            to="/"
            style={{
              color: '#3498db',
              textDecoration: 'none',
              fontWeight: '500'
            }}
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  if (!temple) {
    return (
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h3>Temple not found</h3>
        <Link 
          to="/"
          style={{
            color: '#3498db',
            textDecoration: 'none',
            fontWeight: '500'
          }}
        >
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Back Navigation */}
      <div style={{ marginBottom: '2rem' }}>
        <Link 
          to="/"
          style={{
            color: '#3498db',
            textDecoration: 'none',
            fontWeight: '500',
            fontSize: '0.95rem'
          }}
        >
          ← Back to Home
        </Link>
      </div>

      {/* Temple Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#2c3e50',
          margin: '0 0 1rem 0',
          lineHeight: '1.2'
        }}>
          {temple.name}
        </h1>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          justifyContent: 'center',
          marginBottom: '1rem'
        }}>
          <span style={{
            backgroundColor: '#e8f4fd',
            color: '#2980b9',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            🕉️ {temple.deity}
          </span>
          <span style={{
            backgroundColor: '#f0f9ff',
            color: '#1e40af',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            🏛️ {temple.era}
          </span>
          <span style={{
            backgroundColor: '#f0fdf4',
            color: '#166534',
            padding: '0.5rem 1rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: '600'
          }}>
            🏗️ {temple.architecture}
          </span>
        </div>
        
        <p style={{
          fontSize: '1.1rem',
          color: '#666',
          margin: 0,
          fontWeight: '500'
        }}>
          📍 {temple.city}, {temple.state}
        </p>
      </div>

      {/* Temple Image */}
      {temple.photo_url && (
        <div style={{
          marginBottom: '3rem',
          textAlign: 'center'
        }}>
          <img 
            src={temple.photo_url} 
            alt={temple.name}
            style={{
              maxWidth: '100%',
              height: 'auto',
              maxHeight: '500px',
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {/* Temple Details Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem'
      }}>
        {/* History Section */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e1e5e9',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: '600',
            color: '#2c3e50',
            margin: '0 0 1rem 0',
            borderBottom: '2px solid #3498db',
            paddingBottom: '0.5rem'
          }}>
            📜 History
          </h3>
          <p style={{
            color: '#555',
            lineHeight: '1.6',
            margin: 0,
            fontSize: '0.95rem'
          }}>
            {temple.history}
          </p>
        </div>

        {/* Significance Section */}
        {temple.significance && (
          <div style={{
            backgroundColor: '#ffffff',
            padding: '2rem',
            borderRadius: '12px',
            border: '1px solid #e1e5e9',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h3 style={{
              fontSize: '1.3rem',
              fontWeight: '600',
              color: '#2c3e50',
              margin: '0 0 1rem 0',
              borderBottom: '2px solid #e74c3c',
              paddingBottom: '0.5rem'
            }}>
              ⭐ Significance
            </h3>
            <p style={{
              color: '#555',
              lineHeight: '1.6',
              margin: 0,
              fontSize: '0.95rem',
              fontStyle: 'italic'
            }}>
              {temple.significance}
            </p>
          </div>
        )}
      </div>

      {/* Location Information */}
      {temple.location && (
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid #e9ecef',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '1.3rem',
            fontWeight: '600',
            color: '#2c3e50',
            margin: '0 0 1rem 0'
          }}>
            📍 Location Details
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
            textAlign: 'left'
          }}>
            <div>
              <strong style={{ color: '#2c3e50' }}>City:</strong>
              <span style={{ marginLeft: '0.5rem', color: '#555' }}>{temple.city}</span>
            </div>
            <div>
              <strong style={{ color: '#2c3e50' }}>State:</strong>
              <span style={{ marginLeft: '0.5rem', color: '#555' }}>{temple.state}</span>
            </div>
            <div>
              <strong style={{ color: '#2c3e50' }}>Coordinates:</strong>
              <span style={{ marginLeft: '0.5rem', color: '#555' }}>
                {temple.location.lat}°N, {temple.location.lng}°E
              </span>
            </div>
            <div>
              <strong style={{ color: '#2c3e50' }}>Architecture:</strong>
              <span style={{ marginLeft: '0.5rem', color: '#555' }}>{temple.architecture}</span>
            </div>
          </div>
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

export default TempleDetails;
