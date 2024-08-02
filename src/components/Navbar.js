import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for styling

const Navbar = () => {
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyStore</Link> {/* Replace with your logo or name */}
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/products">Products</Link>
        </li>
        <li className="navbar-categories">
          <button className="categories-toggle" onClick={toggleCategories}>
            Categories
          </button>
          {showCategories && (
            <ul className="categories-dropdown">
              <li>
                <Link to="/category/electronics">Electronics</Link>
              </li>
              <li>
                <Link to="/category/fashion">Fashion</Link>
              </li>
              <li>
                <Link to="/category/home">Home</Link>
              </li>
              <li>
                <Link to="/category/sports">Sports</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <div className="navbar-theme">
        <button className="theme-toggle">🌙</button>{" "}
        {/* Replace with your theme toggle icon */}
      </div>
    </nav>
  );
};

export default Navbar;
