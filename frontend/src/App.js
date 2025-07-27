import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import SearchResults from './pages/SearchResults';
import TempleDetails from './pages/TempleDetails';
import Stats from './pages/Stats';
import './App.css';

function App() {
  return (
    <Router>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: '#f8f9fa'
      }}>
        <Header />
        <main style={{
          flex: 1,
          backgroundColor: '#ffffff'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/temple/:id" element={<TempleDetails />} />
            <Route path="/stats" element={<Stats />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
