import Post from '../domain/Post';
import User from '../domain/User';

// TODO: Get this from the config
const apiBaseUrl = 'http://192.168.1.7:8000';

// TODO: Refactor and split into separate files
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

  updateProfile: async (jwt: string, avatar: string) => {
    const url = new URL('/user/update', apiBaseUrl).href;
    const response = await fetch(url, {
      method: 'POST',
      headers: new Headers({
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({
        avatar: avatar,
      }),
    });
    if (response.status === 200) {
      return;
    } else {
      throw new Error();
    }
  },

  getUser: async (username: string) => {
    const url = new URL('/user', apiBaseUrl);
    url.searchParams.append('username', username);
    const response = await fetch(url.href);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      const id: number = data.id;
      const username: string = data.username;
      const avatar: string | null = data.avatar;
      return { id: id, username: username, avatar: avatar };
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
    const posts = data.map(
      (d): Post => {
        return {
          id: d.id,
          text: d.text,
          createdAt: new Date(d.createdAt),
          user: {
            id: d.user.id,
            avatar: d.user.avatar,
            username: d.user.username,
          },
          likes: d.likes,
          likedByMe: d.likedByMe,
        };
      }
    );
    return posts;
  },

  getPostsByUser: async (username: string) => {
    const url = new URL('/posts', apiBaseUrl);
    url.searchParams.append('username', username);
    const response = await fetch(url.href);
    if (response.status !== 200) {
      throw new Error();
    }
    const data = (await response.json()) as any[];
    const posts = data.map(
      (d): Post => {
        return {
          id: d.id,
          text: d.text,
          createdAt: new Date(d.createdAt),
          user: {
            id: d.user.id,
            avatar: d.user.avatar,
            username: d.user.username,
          },
          likes: d.likes,
          likedByMe: d.likedByMe,
        };
      }
    );
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

  imageFullUrl: (filename: string) => {
    const url = new URL(`/uploads/images/${filename}`, apiBaseUrl);
    return url.href;
  },
};

export default api;
