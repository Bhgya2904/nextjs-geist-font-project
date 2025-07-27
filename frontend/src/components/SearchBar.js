import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ placeholder = "Search for temples by name, deity, location, or era..." }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: '0.5rem',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <input 
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          flex: 1,
          padding: '0.75rem 1rem',
          fontSize: '1rem',
          border: '2px solid #e1e5e9',
          borderRadius: '8px',
          outline: 'none',
          transition: 'border-color 0.2s',
          fontFamily: 'inherit'
        }}
        onFocus={(e) => e.target.style.borderColor = '#3498db'}
        onBlur={(e) => e.target.style.borderColor = '#e1e5e9'}
      />
      <button 
        type="submit" 
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          fontWeight: '600',
          border: 'none',
          borderRadius: '8px',
          backgroundColor: '#3498db',
          color: '#ffffff',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          fontFamily: 'inherit'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
