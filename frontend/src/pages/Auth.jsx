import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";
import "../styles/auth.css";

function Auth() {

  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const mode = queryParams.get("mode");

  const [isRegister, setIsRegister] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role_id: "",
  });

  useEffect(() => {
    setIsRegister(mode === "register");
  }, [mode]);

  // ================= LOGIN =================

  const handleLogin = async (e) => {

    e.preventDefault();
    setLoading(true);
    setError("");

    try {

      const data = await loginUser(loginData.email, loginData.password);

      const role = Number(data.role_id);

      // ================= STORE LOGIN DATA =================

      localStorage.setItem("token", data.access_token);
      localStorage.setItem("role_id", String(role));
      localStorage.setItem("username", data.name);

      // IMPORTANT FIX
      // Store student_id for dashboard API
      localStorage.setItem("student_id", data.student_id);

      // ================= REDIRECT =================

      if (role === 1) {
        navigate("/admin");
      }

      else if (role === 2) {
        navigate("/student");
      }

      else if (role === 3) {
        navigate("/staff");
      }

      else {
        navigate("/");
      }

    } catch (err) {

      setError(
        typeof err === "string"
          ? err
          : err?.response?.data?.detail || "Login failed"
      );

    } finally {

      setLoading(false);

    }

  };

  // ================= REGISTER =================

  const handleRegister = async (e) => {

    e.preventDefault();
    setError("");

    if (!registerData.role_id) {
      setError("Please select a role");
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {

      await registerUser({
        ...registerData,
        role_id: Number(registerData.role_id),
      });

      alert("Registration successful! Please login.");
      navigate("/auth?mode=login");

    } catch (err) {

      setError(
        typeof err === "string"
          ? err
          : err?.response?.data?.detail || "Registration failed"
      );

    }

  };

  return (

    <div className="auth-container">

      <div className="auth-card">

        <div className="auth-left">
          <h1>{isRegister ? "WELCOME!" : "WELCOME BACK!"}</h1>
        </div>

        <div className="auth-right">

          <h2>{isRegister ? "Register" : "Login"}</h2>

          {error && <p style={{ color: "red" }}>{error}</p>}

          {/* ================= LOGIN FORM ================= */}

          {!isRegister ? (

            <form onSubmit={handleLogin} className="auth-form">

              <input
                type="email"
                placeholder="Email"
                required
                value={loginData.email}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    email: e.target.value
                  })
                }
              />

              <input
                type="password"
                placeholder="Password"
                required
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({
                    ...loginData,
                    password: e.target.value
                  })
                }
              />

              <button
                type="submit"
                className="auth-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>

              <p className="switch-text">
                Don't have an account?
                <span onClick={() => navigate("/auth?mode=register")}>
                  Register
                </span>
              </p>

            </form>

          ) : (

            /* ================= REGISTER FORM ================= */

            <form onSubmit={handleRegister} className="auth-form">

              <input
                type="text"
                placeholder="Name"
                required
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    name: e.target.value
                  })
                }
              />

              <input
                type="email"
                placeholder="Email"
                required
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    email: e.target.value
                  })
                }
              />

              <input
                type="text"
                placeholder="Phone"
                value={registerData.phone}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    phone: e.target.value
                  })
                }
              />

              <select
                required
                value={registerData.role_id}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    role_id: e.target.value
                  })
                }
              >
                <option value="">Select Role</option>
                <option value="1">Admin</option>
                <option value="2">Student</option>
                <option value="3">Staff</option>
              </select>

              <input
                type="password"
                placeholder="Password"
                required
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password: e.target.value
                  })
                }
              />

              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={registerData.confirmPassword}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value
                  })
                }
              />

              <button type="submit" className="auth-btn">
                Register
              </button>

              <p className="switch-text">
                Already have an account?
                <span onClick={() => navigate("/auth?mode=login")}>
                  Login
                </span>
              </p>

            </form>

          )}

        </div>

      </div>

    </div>

  );

}

export default Auth;