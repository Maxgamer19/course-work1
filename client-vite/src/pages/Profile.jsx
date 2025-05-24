import { useEffect, useState } from 'react';

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/auth/me', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then(res => res.json())
      .then(data => setUser(data.userData));
  }, []);

  if (!user) return <div>Завантаження...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold">Мій профіль:</h2>
      <div className='profile'>
        <div className='profile-1'>
        <img src={user.avatarUrl} alt="Нема Avatar" className="avatar-getme-img" />
        </div>
        <div className='profile-2'>
            <p className='profile-p'><strong>Імʼя:</strong> {user.fullName}</p>
            <p className='profile-p'><strong>Email:</strong> {user.email}</p>
            <p className='profile-p'><strong>Роль:</strong> {user.role}</p>          
        </div>
      </div>
    </div>
  );
}
