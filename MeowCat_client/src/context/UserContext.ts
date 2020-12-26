import { createContext } from 'react';

type UserContextModel = {
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextModel>({
  username: null,
  login: () => {},
  logout: () => {},
});

export default UserContext;
