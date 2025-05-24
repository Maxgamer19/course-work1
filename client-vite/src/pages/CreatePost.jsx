import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:8000/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, text }),
    });
    if (res.ok) navigate('/');
    else alert('Помилка створення поста');
  };

  return (
    <form onSubmit={handleCreate} className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Новий пост</h2>
      <input className="border p-2 w-full" placeholder="Заголовок" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="border p-2 w-full" placeholder="Текст" value={text} onChange={(e) => setText(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Опублікувати</button>
    </form>
  );
}