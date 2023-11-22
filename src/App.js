import { useState } from "react";
import Topbar from './Topbar2.png';
import Building from './TopbarBuild2.png';
import './App.css';

const App = () => {
  const handleLogoClick = () => {
    window.location.href = 'http://localhost:3000';
  };

  return (
    <div className="Topbar">
      <a href="http://localhost:3000" onClick={handleLogoClick}>
        <img className="Logo" src={Topbar} alt="LOGO" />
      </a>
      <img className="Building" src={Building} alt="VILDS" />
      <p className="admin">ADMIN</p>
    </div>
  );
};

export default App;
