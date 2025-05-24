import PostList from '../components/PostList';

export default function Home() {
  return (
    <div className="home-full">
      <div className="home-div">
      <h2 className="p-home-tems">Теми</h2>
      <h2 className="p-home">Перегляди</h2>
      <h2 className="p-home2">Створено</h2>
      </div>
      <PostList />
    </div>
  );
}