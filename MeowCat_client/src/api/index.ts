import Post from '../domain/Post';
import User from '../domain/User';

// TODO: Get this from the config
const apiBaseUrl = 'http://localhost:8000';

const api = {
  getMe: async (jwt: string) => {
    const url = new URL('/me', apiBaseUrl).href;
    const response = await fetch(url, {
      headers: new Headers({
        Authorization: `Bearer ${jwt}`,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      const id: number = data.id;
      const username: string = data.username;
      return { id: id, username: username };
    } else {
      throw new Error();
    }
  },

  login: async (username: string, password: string) => {
    const url = new URL('/login', apiBaseUrl).href;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      const jwt: string = data.token;
      return jwt;
    } else {
      throw new Error();
    }
  },

  signup: async (username: string, password: string) => {
    const url = new URL('/signup', apiBaseUrl).href;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    if (response.status === 200) {
      const data = await response.json();
      const jwt = data.token;
      return jwt;
    } else {
      throw new Error();
    }
  },

  getPosts: async () => {
    const url = new URL('/posts', apiBaseUrl).href;
    const response = await fetch(url);
    if (response.status !== 200) {
      throw new Error();
    }
    const data = (await response.json()) as any[];
    const posts = data.map((d) => {
      // TODO: There has to be a better way to do this.
      const post = new Post();
      post.id = d.id;
      post.text = d.text;
      const user = new User();
      user.id = d.user.id;
      user.username = d.user.username;
      post.user = user;
      post.createdAt = new Date(d.createdAt);
      return post;
    });
    return posts;
  },

  addPost: async (jwt: string, text: string) => {
    const url = new URL('/posts', apiBaseUrl).href;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        text: text,
      }),
    });
    if (response.status !== 200) {
      throw new Error();
    }
    const data = await response.json();
    const newPostId = data.id;
    return newPostId;
  },
};

export default api;
