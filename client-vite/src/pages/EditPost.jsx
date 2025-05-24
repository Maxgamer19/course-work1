import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPost() {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setText(data.text);
      });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:8000/posts/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ title, text }),
    });
    navigate('/');
  };

  return (
    <form onSubmit={handleUpdate} className="p-4 max-w-md mx-auto space-y-4">
      <h2 className="text-xl font-bold">Редагувати пост</h2>
      <input className="border p-2 w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
      <textarea className="border p-2 w-full" value={text} onChange={(e) => setText(e.target.value)} />
      <button className="bg-yellow-600 text-white px-4 py-2 rounded" type="submit">Оновити</button>
    </form>
  );
}