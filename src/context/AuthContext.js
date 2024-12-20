import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem("user");
    if (savedData) {
      try {
        const { token, info } = JSON.parse(savedData);
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp > currentTime) {
          setUser({ ...decodedToken, ...info });
        } else {
          console.error("Token expired");
          logout();
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        logout();
      }
    }
  }, []);

  const login = (token, userInfo) => {
    setUser({ ...jwtDecode(token), ...userInfo });
    localStorage.setItem("user", JSON.stringify({ token, info: userInfo }));
  };

  const logout = () => {
    setUser(null);

    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
