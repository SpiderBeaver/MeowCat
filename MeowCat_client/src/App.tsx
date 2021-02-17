import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserContext from './context/UserContext';
import Post from './domain/Post';
import Header from './components/Header';
import PostsList from './components/PostsList';
import Container from './components/Container';
import LoginPage from './components/LoginPage';

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchMe = async () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt == null) {
        return;
      }
      const response = await fetch('http://localhost:8000/me', {
        headers: new Headers({
          Authorization: `Bearer ${jwt}`,
        }),
      });
      const data = await response.json();
      setUsername(data.username);
    };
    fetchMe();
  }, []);

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
      </UserContext.Provider>
    </div>
  );
}

export default App;
