import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Post from './domain/Post';
import Header from './components/Header';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/posts');
      const data = await response.json();
      setPosts(data);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header />
      <header>hi1</header>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
