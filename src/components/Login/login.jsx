import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../../services/api"; // Make sure both are defined
import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const [flipped, setFlipped] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupUsername, setSignupUsername] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const allowedDomain = "kmit.in";

  useEffect(() => {
    document.body.classList.add(styles["login-body"]);
    return () => {
      document.body.classList.remove(styles["login-body"]);
    };
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailDomain = email.split("@")[1];
    if (emailDomain !== allowedDomain) {
      setError("❌ Only college members can log in!");
      return;
    }

    try {
      const { token, role } = await loginUser(email, password);

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      switch (role) {
        case "admin":
          navigate("/dashboard");
          break;
        case "hod":
          navigate("/hod");
          break;
        case "user":
          navigate("/userDashboard");
          break;
        default:
          navigate("/userDashboard");
      }
    } catch (err) {
      setError(`❌ ${err.response?.data?.message || "Login failed"}`);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const emailDomain = signupEmail.split("@")[1];
    if (emailDomain !== allowedDomain) {
      setError("❌ Only college members can sign up!");
      return;
    }

    try {
      const { token, role } = await signupUser(signupUsername, signupEmail, signupPassword);

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      switch (role) {
        case "admin":
          navigate("/dashboard");
          break;
        case "hod":
          navigate("/hod");
          break;
        case "user":
          navigate("/userDashboard");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (err) {
      setError(`❌ ${err.response?.data?.message || "Signup failed"}`);
    }
  };

  return (
    <div className={styles["login-wrapper"]}>
      {/* Background animation */}
      <div className={styles["background"]}>
        <div className={styles["circle"]}></div>
        <div className={styles["circle"]}></div>
        <div className={styles["circle"]}></div>
      </div>

      {/* Login/Signup Flip Container */}
      <div className={`${styles["login-container"]} ${flipped ? styles["flip"] : ""}`}>
        {/* Login Card */}
        <div className={styles["login-card"]}>
          <h2 className={styles["title"]}>Login</h2>
          {error && <p className={styles["error-message"]}>{error}</p>}
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles["login-button"]} type="submit">
              Login
            </button>
          </form>
          <span className={styles["signup-link"]} onClick={handleFlip}>
            Don't have an account? Sign up here
          </span>
        </div>

        {/* Signup Card */}
        <div className={styles["signup-card"]}>
          <h2 className={styles["title"]}>Sign Up</h2>
          {error && <p className={styles["error-message"]}>{error}</p>}
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Username"
              required
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              required
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              required
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />
            <button className={styles["login-button"]} type="submit">
              Sign Up
            </button>
          </form>
          <span className={styles["signup-link"]} onClick={handleFlip}>
            Already have an account? Login here
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
