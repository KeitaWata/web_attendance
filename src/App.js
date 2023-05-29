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
            <Route path="/web_attendance/" element={<Notice />} />
            <Route path="/web_attendance/timetable" element={<TimeTable />} />
            <Route path="/web_attendance/companydiscount" element={<CompanyDiscount />} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
