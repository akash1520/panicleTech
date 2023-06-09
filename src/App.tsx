import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Form from './pages/FormPage';
import Charts from './pages/Charts';
import Tables from './pages/Tables';
import Cards from './pages/Cards';


const App = () => {
  return (
    <Router>
      <nav style={{ background: "black" }}>
        <ul style={{ display: "flex", listStyle: "none", margin: 0 }}>
          <li style={{ margin: "1rem", color: "whitesmoke" }}>
            <Link style={{ color: "whitesmoke", textDecoration: "none" }} to="/">Form</Link>
          </li>
          <li style={{ margin: "1rem" }}>
            <Link style={{ color: "whitesmoke", textDecoration: "none" }} to="/charts">Charts</Link>
          </li>
          <li style={{ margin: "1rem" }}>
            <Link style={{ color: "whitesmoke", textDecoration: "none" }} to="/tables">Tables</Link>
          </li>
          <li style={{ margin: "1rem" }}>
            <Link style={{ color: "whitesmoke", textDecoration: "none" }} to="/cards">Cards</Link>
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
