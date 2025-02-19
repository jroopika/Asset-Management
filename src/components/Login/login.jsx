import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import styles from "./LoginPage.module.css"; // Import styles as a CSS module

const LoginPage = () => {
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate(); // Hook to navigate

  useEffect(() => {
    document.body.classList.add(styles["login-body"]);
    return () => {
      document.body.classList.remove(styles["login-body"]);
    };
  }, []);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  // Handle Login Submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission reload
    navigate("/dashboard"); // Redirect to Dashboard
  };

  return (
    <div className={styles["login-wrapper"]}>
      {/* Animated background */}
      <div className={styles["background-animation"]}>
        <div className={styles["circle"]}></div>
        <div className={styles["circle"]}></div>
        <div className={styles["circle"]}></div>
        <div className={styles["circle"]}></div>
        <div className={styles["laptop"]}></div>
        <div className={styles["laptop"]}></div>
      </div>

      {/* Login / Signup Container */}
      <div className={`${styles["login-container"]} ${flipped ? styles["flip"] : ""}`}>
        {/* Login Card */}
        <div className={styles["login-card"]}>
          <h2 className={styles["title"]}>Login</h2>
          <form onSubmit={handleLogin}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
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
          <form>
            <input type="text" placeholder="Username" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
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
