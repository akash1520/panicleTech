import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Form from './pages/Form';
import Charts from './pages/Charts';
import Tables from './pages/Tables';
import Cards from './pages/Cards';


const App = () => {
  return (
    <Router>
      <nav style={{background:"black"}}>
        <ul style={{display:"flex",listStyle:"none",margin:0}}>
          <li style={{margin:"1rem"}}>
            <Link to="/">Form</Link>
          </li>
          <li style={{margin:"1rem"}}>
            <Link to="/charts">Charts</Link>
          </li>
          <li style={{margin:"1rem"}}>
            <Link to="/tables">Tables</Link>
          </li>
          <li style={{margin:"1rem"}}>
            <Link to="/cards">Cards</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/tables" element={<Tables />} />
        <Route path="/cards" element={<Cards />} />
      </Routes>
    </Router>
  );
};

export default App;
