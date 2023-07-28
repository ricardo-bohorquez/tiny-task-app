import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export function AuthProvider({ children }) {
  const [userLogin, setUserLogin] = useState({
    state: false,
  });
  return (
    <AuthContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </AuthContext.Provider>
  );
}
