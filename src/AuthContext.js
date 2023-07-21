import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // You can add more state variables like user data, etc., as needed

  // Function to log in the user and set the isLoggedIn state to true
  function login() {
    setIsLoggedIn(true);
  }

  // Function to log out the user and set the isLoggedIn state to false
  function logout() {
    // Perform your logout logic here, set isLoggedIn to false after logout
    localStorage.clear();
    setIsLoggedIn(false);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
