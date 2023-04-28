import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeaderComponent from "./components/Header";
import FooterComponent from "./components/Footer";
import DisplayAllStates from "./components/DisplayAllStates";
import DisplayAllDistricts from "./components/DisplayAllDistricts";
import DisplayAllLocations from "./components/DisplayAllLocations";

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="main">
          <Routes>
            <Route path="/" element={<DisplayAllStates />} />
            <Route path="/districts" element={<DisplayAllDistricts />} />
            <Route path="/locations" element={<DisplayAllLocations />} />
          </Routes>
        </div>
        <FooterComponent />
      </Router>
    </div>
  );
}

export default App;
