import React, { useEffect, useState } from 'react';
import { fetchStats } from '../services/api';

function Stats() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        setLoading(true);
        const response = await fetchStats();
        setStats(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadStats();
  }, []);

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
            Loading statistics...
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
          <h3 style={{ margin: '0 0 0.5rem 0' }}>Error Loading Statistics</h3>
          <p style={{ margin: 0 }}>{error}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h3>No statistics available</h3>
      </div>
    );
  }

  const StatCard = ({ title, data, color, icon }) => (
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
        margin: '0 0 1.5rem 0',
        borderBottom: `2px solid ${color}`,
        paddingBottom: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <span>{icon}</span>
        {title}
      </h3>
      <div style={{
        display: 'grid',
        gap: '0.75rem'
      }}>
        {Object.entries(data)
          .sort(([,a], [,b]) => b - a)
          .map(([key, value]) => (
          <div key={key} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.5rem',
            backgroundColor: '#f8f9fa',
            borderRadius: '6px',
            border: '1px solid #e9ecef'
          }}>
            <span style={{
              color: '#555',
              fontWeight: '500',
              textTransform: 'capitalize'
            }}>
              {key}
            </span>
            <span style={{
              backgroundColor: color,
              color: '#ffffff',
              padding: '0.25rem 0.75rem',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: '600'
            }}>
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '3rem'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          fontWeight: '700',
          color: '#2c3e50',
          margin: '0 0 1rem 0'
        }}>
          Temple Statistics
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#7f8c8d',
          margin: 0,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Explore the distribution of temples across India by various categories
        </p>
      </div>

      {/* Total Count Card */}
      <div style={{
        backgroundColor: '#3498db',
        color: '#ffffff',
        padding: '2rem',
        borderRadius: '12px',
        textAlign: 'center',
        marginBottom: '3rem',
        boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)'
      }}>
        <h2 style={{
          fontSize: '3rem',
          fontWeight: '700',
          margin: '0 0 0.5rem 0'
        }}>
          {stats.total_temples}
        </h2>
        <p style={{
          fontSize: '1.2rem',
          margin: 0,
          opacity: 0.9
        }}>
          Total Temples in Database
        </p>
      </div>

      {/* Statistics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '2rem'
      }}>
        <StatCard 
          title="By State"
          data={stats.by_state}
          color="#e74c3c"
          icon="🗺️"
        />
        
        <StatCard 
          title="By Deity"
          data={stats.by_deity}
          color="#f39c12"
          icon="🕉️"
        />
        
        <StatCard 
          title="By Era"
          data={stats.by_era}
          color="#27ae60"
          icon="⏳"
        />
      </div>

      {/* Additional Info */}
      <div style={{
        marginTop: '3rem',
        padding: '2rem',
        backgroundColor: '#f8f9fa',
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
          About This Data
        </h3>
        <p style={{
          color: '#666',
          lineHeight: '1.6',
          margin: 0,
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          This database contains information about significant temples across India, 
          including their historical background, architectural styles, and cultural significance. 
          The data is continuously updated to provide accurate and comprehensive information 
          about India's rich temple heritage.
        </p>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Stats;
