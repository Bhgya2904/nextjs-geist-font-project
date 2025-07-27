import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header style={{
      backgroundColor: '#ffffff',
      padding: '1rem 2rem',
      borderBottom: '1px solid #e5e5e5',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{
          textDecoration: 'none',
          color: '#333'
        }}>
          <h1 style={{ 
            margin: 0, 
            fontSize: '1.8rem',
            fontWeight: '600',
            color: '#2c3e50'
          }}>
            TempleSeeker AI
          </h1>
        </Link>
        
        <nav>
          <ul style={{
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: '2rem'
          }}>
            <li>
              <Link to="/" style={{
                textDecoration: 'none',
                color: '#666',
                fontWeight: '500',
                transition: 'color 0.2s'
              }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/stats" style={{
                textDecoration: 'none',
                color: '#666',
                fontWeight: '500',
                transition: 'color 0.2s'
              }}>
                Statistics
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
