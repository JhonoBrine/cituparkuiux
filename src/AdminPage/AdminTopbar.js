import { useState } from "react";
import Topbar from './AdminImages/Topbar2.png';
import Building from './AdminImages/TopbarBuild2.png';
import './styleAdmMain/AdminStyle.css';

const AdminTopbar = () => {
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

export default AdminTopbar;
