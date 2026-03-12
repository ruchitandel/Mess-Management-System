import React from "react";
import "../styles/dashboard.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <p>Loading dashboard...</p>
    </div>
  );
}

export default Loader;