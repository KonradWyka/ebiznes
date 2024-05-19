import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/login', { username, password });
      console.log(response?.data); 
      alert('Zalogowano pomyślnie!');
    } catch (error) {
      console.error('Błąd logowania:', error.response?.data.error);
      alert('Błąd logowania. Spróbuj ponownie.'); 
    }
  };

  const handleRegister = () => {
    navigate('/register');
  };

  return (
    <div className="container">
      <h2>Logowanie</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input-field" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input-field" />
        </div>
        <button type="submit" className="button">Zaloguj</button>
		<button type="button" className="button" onClick={handleRegister} style={{ marginLeft: '10px' }}>Register Now</button>
      </form>
    </div>
  );
};

export default LoginForm;
