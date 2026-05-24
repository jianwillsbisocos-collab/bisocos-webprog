import { createContext, useContext, useState, useEffect } from "react";
import { loginUser, createUser } from "../services/UserServices";

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("auth_user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("auth_user");
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await loginUser({ email, password });
    // data: { message, token, type, firstName }
    const userData = {
      email,
      name: data.firstName,
      type: data.type,
      token: data.token,
    };
    setUser(userData);
    localStorage.setItem("token", data.token);
    localStorage.setItem("auth_user", JSON.stringify(userData));
    return userData;
  };

  const signup = async (userData) => {
    const { data } = await createUser(userData);
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("auth_user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

