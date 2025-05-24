import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [avatarUrl,setavatarUrl] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, fullName, avatarUrl }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
      navigate('/');
    } else alert(data.message);
  };

  return (
    <form onSubmit={handleRegister} className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Реєстрація</h2>
      <input className="border p-2 w-full" placeholder="Імʼя" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <input className="border p-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" className="border p-2 w-full" placeholder="Пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
      <input type="text" className="avatar" src="" alt=""placeholder="Аватар(необов'язково)" value = {avatarUrl} onChange={(e) => setavatarUrl(e.target.value)} />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">Зареєструватись</button>
    </form>
  );
}