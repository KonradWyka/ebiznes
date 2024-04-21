import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Produkty from './Product';
import Platnosci from './Platnosci';
import Koszyk from './Koszyk';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/">Produkty</Link>
            </li>
            <li>
              <Link to="/platnosci">Płatności</Link>
            </li>
            <li>
              <Link to="/koszyk">Koszyk</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/platnosci" element={ <Platnosci />} />
          <Route path="/koszyk" element={ <Koszyk />} />
          <Route path="/" element={ <Produkty />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
