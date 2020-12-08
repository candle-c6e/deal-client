import { useContext, createContext, useState } from "react";

const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
};

const initialState = null;

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  return (
    <UserContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
