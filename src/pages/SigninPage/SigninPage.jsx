import logo from "../../public/assets/pixelpath-home-logo.jpg";
import { useState } from "react";
import axios from "axios";
import './SigninPage.scss'
// import LoginForm from "../../components/LoginForm/LoginForm";

const BASE_URL = import.meta.env.VITE_API_URL;


function SigninPage() {
  const [isRegistering, setIsRegistering] = useState(false); // Toggle state
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState(''); // Only for registration
    const [error, setError] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (isRegistering) {
                // Registration Logic
                await axios.post(`${BASE_URL}/auth/register`, {
                    username,
                    email,
                    password,
                });
                alert('Registration successful! You can now log in.');
                setIsRegistering(false); // Switch to login after successful registration
            } else {
                // Login Logic
                const response = await axios.post(`${BASE_URL}/auth/login`, {
                    email,
                    password,
                });
                const { token } = response.data;

                localStorage.setItem('token', token);
                alert('Login successful!');
            }
        } catch (err) {
            if (err.response) {
                setError(err.response.data.error || 'An error occurred.');
            } else {
                setError('Unable to connect to the server.');
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

      <div>
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                )}
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>
                {isRegistering
                    ? 'Already have an account? '
                    : "Don't have an account? "}
                <button
                    type="button"
                    onClick={() => setIsRegistering(!isRegistering)}
                    style={{ background: 'none', border: 'none', color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}
                >
                    {isRegistering ? 'Login' : 'Register'}
                </button>
            </p>
        </div>

    </div>
</>
  );
}

export default SigninPage;
