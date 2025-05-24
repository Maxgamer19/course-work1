import { Link, useNavigate } from 'react-router-dom';
export default function Header() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
    window.location.reload();
  };

  return (
    <header className="fullheader">
      <div className="header-div1">
        <nav className="header-nav">
          <Link to="/" className="header-p">Форум</Link>
          {token && <Link to="/create" className="header-p">+ Новий пост</Link>}
          {!token && <Link to="/login" className="header-p">Вхід</Link>}
          {!token && <Link to="/register" className="header-p">Реєстрація</Link>}
          {token && <Link to="/profile" className="header-p">Профіль</Link>}
          {token && <button onClick={handleLogout} className="header-button">Вийти</button>}
        </nav>
      </div>
      <div className="header-div2">
          <Link to="/"><img className="header-icon1" src="/images/icon.png" alt="" /></Link>

      </div>
    </header>
  );
}