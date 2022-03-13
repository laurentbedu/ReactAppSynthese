import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingScreen from "./screens/LandingScreen";
import ListScreen from "./screens/ListScreen";


function App() {
  return (
    <div className="container app bg-primary pt-3">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingScreen />} />
          <Route path="/list" element={<ListScreen />} />

          <Route path="*" element={<LandingScreen />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
