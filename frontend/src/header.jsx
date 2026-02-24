import React, { useState } from "react";
import logo from "./p.jpg";
import "./he.css";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="navb">
        <div className="logo-container">
          <img src={logo} alt="logo" />
          <h1 className="brand">CI Dashboard</h1>
        </div>

        <ul className={menuOpen ? "nav-links active" : "nav-links"}>
          <li>Home</li>
          <li>About</li>
          <li>Analytics</li>
          <li className="btn">Login</li>
        </ul>

        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </nav>
    </header>
  );
};

export default Header;