import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function PostPage() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/posts/${id}`)
      .then(res => res.json())
      .then(data => {
        setPost(data);
        setReplies(data.replies || []);
      });
  }, [id]);

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return alert('Поле не може бути порожнім');
    const res = await fetch(`http://localhost:8000/posts/reply/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ text: replyText }),
    });
    if (res.ok) {
      const newReply = await res.json();
      setReplies([...replies, newReply]);
      setReplyText('');
    } else {
      alert('Помилка додавання відповіді');
    }
  };

  if (!post) return <div>Завантаження...</div>;

  return (
    <div className="full-reply">

      {/* Пост */}
      <div className="user-reply">
      <p className="text-sm text-gray-500 mb-2">
          Автор: {post.user?.fullName || 'невідомий'} | 
          Створено: {new Date(post.createdAt).toLocaleString()} | 
          Переглядів: {post.viewsCount}
      </p>
        <h3  className="text-2xl font-bold mb-2">{post.text}</h3>
      </div>

      {/* Відповіді */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Відповіді:</h3>
        {replies.length === 0 ? (
          <p className="text-gray-500">Ще немає відповідей</p>
        ) : (
          <ul className="space-y-2">
            {replies.map((r) => (
              <li key={r._id} className="border p-2 rounded bg-gray-50">
                <div className="text-sm text-gray-500 mb-1">
                  {r.user?.fullName || 'Анонім'} | {new Date(r.createdAt).toLocaleString()}
                </div>
                <div>{r.text}</div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Форма відповіді */}
      <form onSubmit={handleReply} className="space-y-2">
        <textarea
          className="border p-2 w-full rounded"
          placeholder="Твоя відповідь"
          value={replyText}
          onChange={(e) => setReplyText(e.target.value)}
        />
        <button
          className="bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          type="submit"
          disabled={!replyText.trim()}
        >
          Надіслати відповідь
        </button>
      </form>
    </div>
  );
}
