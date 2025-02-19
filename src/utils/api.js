import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signup } from "../utils/api";

const Auth = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data;
    
    if (isSignup) {
      data = await signup(user);
    } else {
      data = await login({ email: user.email, password: user.password });
    }

    if (data.error) {
      setMessage(data.error);
    } else {
      if (!isSignup) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard"); // Redirect after login
      }
      setMessage(isSignup ? "Signup successful! You can now login." : "Login successful!");
    }
  };

  return (
    <div className="auth-container">
      <h2>{isSignup ? "Signup" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        {isSignup && (
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
        )}
        <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{isSignup ? "Signup" : "Login"}</button>
      </form>
      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}
        <button onClick={() => setIsSignup(!isSignup)}>
          {isSignup ? "Login" : "Signup"}
        </button>
      </p>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Auth;
