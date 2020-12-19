import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './domain/Post';
import Header from './components/Header';
import PostsList from './components/PostsList';
import Container from './components/Container';

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
      <Container>
        <PostsList posts={posts} />
      </Container>
    </div>
  );
}

export default App;
