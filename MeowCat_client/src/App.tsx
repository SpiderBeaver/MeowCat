import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Post from './domain/Post';
import Header from './components/Header';
import PostsList from './components/PostsList';
import Container from './components/Container';
import LoginPage from './components/LoginPage';

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
      <Router>
        <Header />
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/">
            <Container>
              <PostsList posts={posts} />
            </Container>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
