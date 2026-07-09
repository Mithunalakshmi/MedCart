import toast from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../styles/Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userName", response.data.user.name);

      toast.success("Login Successful");

      window.location.href = "/products";
    } catch (err) {
      console.log(err);

      if (err.response) {
        toast.error(err.response.data.message);
      } else {
        toast.error("Login Failed");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome Back 👋</h1>

        <p className="login-subtitle">
          Login to continue shopping at MedCart
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>
        </form>

        <p className="register-text">
          Don't have an account?
          <Link to="/register"> Register </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;