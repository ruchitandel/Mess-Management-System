import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../styles/home.css";

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={logo} alt="Mess Logo" className="logo-img" />
        <span className="logo-text">Mess System</span>
      </div>

      <div className="nav-buttons">
        <button
          className="nav-btn outline"
          onClick={() => navigate("/auth?mode=login")}
        >
          Login
        </button>

        <button
          className="nav-btn solid"
          onClick={() => navigate("/auth?mode=register")}
        >
          Register
        </button>
      </div>
    </nav>
  );
}

export default Navbar;