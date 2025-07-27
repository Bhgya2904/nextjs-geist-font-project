import React from 'react';
import { useNavigate } from 'react-router-dom';

function TempleCard({ temple, showRelevanceScore = false, relevanceScore = null }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/temple/${temple.id}`);
  };

  return (
    <div 
      onClick={handleClick}
      style={{
        border: '1px solid #e1e5e9',
        borderRadius: '12px',
        padding: '1.5rem',
        margin: '0.5rem',
        cursor: 'pointer',
        backgroundColor: '#ffffff',
        transition: 'all 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        e.currentTarget.style.borderColor = '#3498db';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = '#e1e5e9';
      }}
    >
      {showRelevanceScore && relevanceScore && (
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          backgroundColor: '#3498db',
          color: 'white',
          padding: '0.25rem 0.5rem',
          borderRadius: '4px',
          fontSize: '0.75rem',
          fontWeight: '600'
        }}>
          {Math.round(relevanceScore * 100)}% match
        </div>
      )}
      
      <div style={{ marginBottom: '1rem' }}>
        <h3 style={{ 
          margin: '0 0 0.5rem 0', 
          fontSize: '1.25rem',
          fontWeight: '600',
          color: '#2c3e50',
          lineHeight: '1.3'
        }}>
          {temple.name}
        </h3>
        
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '0.75rem'
        }}>
          <span style={{
            backgroundColor: '#e8f4fd',
            color: '#2980b9',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: '500'
          }}>
            {temple.deity}
          </span>
          <span style={{
            backgroundColor: '#f0f9ff',
            color: '#1e40af',
            padding: '0.25rem 0.5rem',
            borderRadius: '4px',
            fontSize: '0.8rem',
            fontWeight: '500'
          }}>
            {temple.era}
          </span>
        </div>
        
        <p style={{ 
          margin: '0 0 0.5rem 0',
          color: '#666',
          fontSize: '0.9rem',
          fontWeight: '500'
        }}>
          📍 {temple.city}, {temple.state}
        </p>
      </div>

      {temple.photo_url && (
        <div style={{
          width: '100%',
          height: '200px',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '1rem'
        }}>
          <img 
            src={temple.photo_url} 
            alt={temple.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.2s'
            }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      )}

      {temple.significance && (
        <p style={{
          margin: '0.5rem 0 0 0',
          color: '#7f8c8d',
          fontSize: '0.85rem',
          fontStyle: 'italic',
          lineHeight: '1.4'
        }}>
          {temple.significance}
        </p>
      )}
    </div>
  );
}

export default TempleCard;
