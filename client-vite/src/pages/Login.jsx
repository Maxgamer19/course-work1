import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/');
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/');
    } else alert(data.message);
  };

  return (
    <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Вхід</h2>
      <input className="border p-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="border p-2 w-full" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Увійти</button>
    </form>
  );
}