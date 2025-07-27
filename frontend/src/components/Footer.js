import React from 'react';

function Footer() {
  return (
    <footer style={{
      backgroundColor: '#f8f9fa',
      padding: '2rem',
      borderTop: '1px solid #e5e5e5',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <p style={{
          margin: 0,
          color: '#666',
          fontSize: '0.9rem'
        }}>
          © 2024 TempleSeeker AI - Discover India's Sacred Heritage
        </p>
        <p style={{
          margin: '0.5rem 0 0 0',
          color: '#888',
          fontSize: '0.8rem'
        }}>
          Built with React.js and FastAPI
        </p>
      </div>
    </footer>
  );
}

export default Footer;
