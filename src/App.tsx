import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Forms from './pages/Forms';
import Charts from './pages/Charts';
import Tables from './pages/Tables';


const App = () => {
  return (
    <Router>
      <nav style={{background:"black", marginTop:"-1.3%"}}>
        <ul style={{display:"flex",listStyle:"none"}}>
          <li style={{margin:"1rem"}}>
            <Link to="/">Forms</Link>
          </li>
          <li style={{margin:"1rem"}}>
            <Link to="/charts">Charts</Link>
          </li>
          <li style={{margin:"1rem"}}>
            <Link to="/tables">Tables</Link>
          </li>
          <li style={{margin:"1rem"}}>
            <a href="#cards">Cards</a>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Forms />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/tables" element={<Tables />} />
      </Routes>
    </Router>
  );
};

export default App;
