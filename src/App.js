import './App.css';
import React from 'react';
import Header from './components/Header';
import Notice from './components/Notice';
import CompanyDiscount from './components/CompanyDiscount';
import TimeTable from './components/TimeTable';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Notice />} />
            <Route path="/timetable" element={<TimeTable />} />
            <Route path="/companydiscount" element={<CompanyDiscount />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
