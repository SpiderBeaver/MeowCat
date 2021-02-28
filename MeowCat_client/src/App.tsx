import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CurrentUserProvider } from './context/current-user.context';
import Post from './domain/Post';
import Header from './components/Header';
import PostsList from './components/PostsList';
import Container from './components/Container';
import LoginPage from './components/LoginPage';
import NewPost from './components/NewPost';
import SignupPage from './components/SignupPage';
import api from './api';
import ProfilePage from './components/ProfilePage';

function App() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await api.getPosts();
      setPosts(posts);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <CurrentUserProvider>
        <Router>
          <Header />
          <Switch>
            <Route path="/signup">
              <SignupPage />
            </Route>
            <Route path="/login">
              <LoginPage />
            </Route>
            <Route path="/u/:username">
              <ProfilePage />
            </Route>
            <Route path="/">
              <Container>
                <NewPost />
                <PostsList posts={posts} />
              </Container>
            </Route>
          </Switch>
        </Router>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
