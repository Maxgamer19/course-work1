import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

export default function PostList() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [currentUserRole, setCurrentUserRole] = useState(null);

  const fetchPosts = () => {
    fetch('http://localhost:8000/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Помилка:', err));
  };

  const fetchMe = () => {
    fetch('http://localhost:8000/auth/me', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    })
      .then(res => res.json())
      .then(data => {
        const user = data.userData;
        setCurrentUserId(user?._id);
        setCurrentUserRole(user?.role);
      })
      .catch(() => {
        setCurrentUserId(null);
        setCurrentUserRole(null);
      });
  };

  useEffect(() => {
    fetchPosts();
    fetchMe();
  }, [id]);

  const handleDelete = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити пост?')) return;
    await fetch(`http://localhost:8000/posts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchPosts();
  };

  return (
    <div className="Full-posts">
      <ul className="posts1">
        {posts.map(post => (
          <li key={post._id} className="li-posts">
            <div className='post1'>
            <Link to={`/post/${post._id}`}>
              <h3 className='post-name'>{post.title}</h3>
            </Link>
            {(currentUserId === post.user?._id || currentUserRole === 'admin') && (
                <>
                  <Link to={`/edit/${post._id}`} className="redact-button">Редагувати</Link>
                  <button onClick={() => handleDelete(post._id)} className="delete-button">Видалити</button>
                </>
              )}
            </div>
            <div className='post2'>
                <div className='posts2'>
                    <p> {post.viewsCount}</p>
                </div>
                <div className='posts3'>
                    <p> {new Date(post.createdAt).toLocaleString()}</p>
                </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
