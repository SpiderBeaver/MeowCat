import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { CurrentUserProvider } from './context/current-user.context';
import Header from './components/Header';
import PostsList from './components/PostsList';
import Container from './components/Container';
import LoginPage from './components/LoginPage';
import NewPost from './components/NewPost';
import SignupPage from './components/SignupPage';
import ProfilePage from './components/ProfilePage';

function App() {
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
                <PostsList />
              </Container>
            </Route>
          </Switch>
        </Router>
      </CurrentUserProvider>
    </div>
  );
}

export default App;
