import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">

      <div className="navbar-container">

        <div className="logo">
          <h2>Custom Web Builds</h2>
        </div>

        <div className={`nav-links ${menuOpen ? "active" : ""}`}>

          <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>

          <a href="#templates" onClick={() => setMenuOpen(false)}>Templates</a>

          <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>

          <a href="#portfolio" onClick={() => setMenuOpen(false)}>Portfolio</a>

          <a href="#reviews" onClick={() => setMenuOpen(false)}>Reviews</a>

          <a href="#plan" onClick={() => setMenuOpen(false)}>Plan Website</a>

          <a href="#book" onClick={() => setMenuOpen(false)}>Book Call</a>

        </div>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

      </div>

    </nav>
  );
}

export default Navbar;