import React, { createContext, useState, useContext, useEffect } from "react";

interface UserContextProps {
  userId: string | null;
  username: string | null;
  setUser: (userId: string | null, username: string | null) => void;
}

const UserContext = createContext<UserContextProps>({
  userId: null,
  username: null,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUserState] = useState<{ userId: string | null; username: string | null }>({
    userId: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
  });

  const setUser = (userId: string | null, username: string | null) => {
    setUserState({ userId, username });
    if (userId && username) {
      localStorage.setItem("userId", userId);
      localStorage.setItem("username", username);
    }
  };

  return (
    <UserContext.Provider value={{ ...user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
