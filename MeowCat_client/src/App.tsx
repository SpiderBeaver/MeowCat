import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserContext from './context/UserContext';
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
  const [username, setUsername] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchMe = async () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt == null) {
        return;
      }
      const meData = await api.getMe(jwt);
      setUsername(meData.username);
    };
    fetchMe();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const posts = await api.getPosts();
      setPosts(posts);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <UserContext.Provider
        value={{
          username: username,
          login: (username) => {
            setUsername(username);
          },
          logout: () => {
            setUsername(null);
          },
        }}
      >
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
                {username != null ? <NewPost /> : ''}
                <PostsList posts={posts} />
              </Container>
            </Route>
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
