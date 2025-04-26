import { useState } from 'react';
import axios from '../axios'; // assuming you have set axios instance
import { useNavigate } from 'react-router-dom';
import './Register.css'; // 👈 import the css file

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios.post('/auth/register', { email, password });
      navigate('/login');
    } catch {
      alert('Registration failed');
    }
  }

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} aria-label="Registration Form" className="register-form">
        <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
