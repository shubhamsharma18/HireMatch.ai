import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register, logout, getme } from "../services/auth.api.js";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const result = await login({ email, password });
      
      if (result.success) {
        setUser(result.data.user);
        setLoading(false);
        return { success: true, data: result.data };
      } else {
        setLoading(false);
        throw new Error(result.error?.message || "Login failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login error:", error);
      return { success: false, error: error.message };
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const result = await register({ username, email, password });
      console.log("Register result:", result);
      
      if (result.success) {
        setUser(result.data.user);
        setLoading(false);
        return { success: true, data: result.data };
      } else {
        setLoading(false);
        throw new Error(result.error?.message || "Registration failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Register error:", error);
      return { success: false, error: error.message };
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const result = await logout();
      
      if (result.success) {
        setUser(null);
        setLoading(false);
        return { success: true };
      } else {
        setLoading(false);
        throw new Error(result.error?.message || "Logout failed");
      }
    } catch (error) {
      setLoading(false);
      console.error("Logout error:", error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      try {
        const result = await getme();
        
        if (result.success) {
          setUser(result.data.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUser();
  }, []);

  return { 
    user, 
    loading, 
    handleLogin, 
    handleLogout, 
    handleRegister 
  };
};