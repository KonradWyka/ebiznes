import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/register', { username, password });
      console.log(response.data);
      alert('Zarejestrowano pomyślnie!');
	  navigate('/login');
    } catch (error) {
      console.error('Błąd rejestracji:', error.response.data.error);
      alert('Błąd rejestracji. Spróbuj ponownie.');
    }
  };

  return (
    <div className="container">
      <h2>Rejestracja</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
        </div>
        <button type="submit" className="button">Zarejestruj</button>
      </form>
    </div>
  );
};

export default RegisterForm;
