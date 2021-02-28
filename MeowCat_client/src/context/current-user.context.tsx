import { createContext, Dispatch, ReactNode, useContext, useEffect, useState } from 'react';
import api from '../api';

type State = {
  id: number;
  username: string;
};

const CurrentUserStateContext = createContext<State | null>(null);
const CurrentUserDispatchContext = createContext<Dispatch<State | null> | null>(null);

function CurrentUserProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State | null>(null);

  useEffect(() => {
    const fetchMe = async () => {
      const jwt = localStorage.getItem('jwt');
      if (jwt == null) {
        return;
      }
      const meData = await api.getMe(jwt);
      setState({ id: meData.id, username: meData.username });
    };
    fetchMe();
  }, []);

  return (
    <CurrentUserStateContext.Provider value={state}>
      <CurrentUserDispatchContext.Provider value={setState}>{children}</CurrentUserDispatchContext.Provider>
    </CurrentUserStateContext.Provider>
  );
}

function useCurrentUserState() {
  const context = useContext(CurrentUserStateContext);
  return context;
}

function useCurrentUserDispatch() {
  const context = useContext(CurrentUserDispatchContext);
  if (!context) {
    throw new Error();
  }
  return context;
}

function useCurrentUser(): [State | null, Dispatch<State | null>] {
  return [useCurrentUserState(), useCurrentUserDispatch()];
}

export { CurrentUserProvider, useCurrentUser };
