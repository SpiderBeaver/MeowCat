import { createContext } from 'react';

type UserContextModel = {
  id: number | null;
  username: string | null;
  login: (id: number, username: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextModel>({
  id: null,
  username: null,
  login: () => {},
  logout: () => {},
});

export default UserContext;
