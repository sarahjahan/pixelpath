import logo from "../../public/assets/pixelpath-home-logo.jpg";
import { useState } from "react";
import axios from "axios";
import './SigninPage.scss'
// import LoginForm from "../../components/LoginForm/LoginForm";

const BASE_URL = import.meta.env.VITE_API_URL;


function SigninPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, formData);
      setMessage(response.data.message);
      setFormData({ email: "", username: "", password: "" });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || "An error occurred.");
      } else {
        setError("Failed to connect to the server.");
      }
    }
  };

  return (
    <>
    <div className="signin">
      <p className="welcome-message">
        Welcome to PixelPath, tracking your gaming journey, one pixel at a time!
      </p>
      <img className="logo" src={logo} />
      <p className="welcome-message">
        Our platform helps you seamlessly organize, track, and enhance your
        gaming journey. Whether you're curating your Game Library, searching for
        new titles, or looking for personalized recommendations that match your
        mood, PixelPath has you covered. Join us and transform the way you
        connect with your games!
      </p>

      <div className="loginform">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>

    </div>
</>
  );
}

export default SigninPage;
