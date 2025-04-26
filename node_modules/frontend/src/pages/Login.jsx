import { useState } from 'react';
import axios from '../axios'; // assuming you set baseURL as /api
import { useNavigate } from 'react-router-dom';
import './Login.css'; // 👈 import the css file

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await axios.post('http', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch {
      alert('Invalid credentials');
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} aria-label="Login Form" className="login-form">
        <h2>Login</h2>
        <input
          aria-label="Email"
          type="email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          aria-label="Password"
          type="password"
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
