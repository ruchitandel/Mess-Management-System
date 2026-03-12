import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/home.css";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">
          <h1>
            Smart <span>Mess Management</span> System
          </h1>

          <p>
            A complete digital solution for meal planning, attendance tracking,
            billing automation, inventory control, vendor management and
            real-time analytics.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/auth?mode=register")}
            >
              Get Started
            </button>

            <button
              className="secondary-btn"
              onClick={() => {
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" });
              }}
            >
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features" id="features">
        <h2>Core Features</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <div className="feature-icon">🍽</div>
            <h3>Meal Planning</h3>
            <p>
              Weekly & monthly scheduling with easy updates and structured
              meal management.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Attendance Tracking</h3>
            <p>
              Real-time attendance monitoring and monthly analytics for
              students.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💳</div>
            <h3>Automated Billing</h3>
            <p>
              Smart bill calculation based on attendance with revenue tracking.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Inventory & Vendors</h3>
            <p>
              Manage stock levels, vendors, low inventory alerts and purchases.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Reports & Analytics</h3>
            <p>
              Visual insights with financial, attendance and inventory charts.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <h3>Announcements</h3>
            <p>
              Admin announcements and student notifications in one place.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Ready to Digitize Your Mess System?</h2>
        <p>Start managing smarter today.</p>

        <button
          className="primary-btn"
          onClick={() => navigate("/auth?mode=register")}
        >
          Create Account
        </button>
      </section>

      <Footer />
    </div>
  );
}

export default Home;