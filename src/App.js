import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WebScreen from './components/WebScreen';
import ImageScreen from './components/ImageScreen';
import HomeScreen from './components/HomeScreen';
import TranslateScreen from './components/TranslateScreen';
const App = () => {
  return (
    <div className="rootpage">
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/web" element={<WebScreen />} />
          <Route path="/image" element={<ImageScreen />} />
          <Route path="/map" element={<TranslateScreen />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
