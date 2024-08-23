










import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);  // Initialize user as null
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);

  const authorizationToken = token ? `Bearer ${token}` : null;

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  const isLoggedIn = !!token;
  console.log("isLoggedIN ", isLoggedIn);

  const LogoutUser = () => {
    toast.info("Logout");
    setToken("");
    setUser(null);  // Clear user on logout
    localStorage.removeItem("token");
    setIsLoading(false);
  };

  const userAuthentication = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`${import.meta.env.VITE_URL_API}/user`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("user data ", data.userData);
        setUser(data.userData);  // Set the user data correctly
        setIsLoading(false);
      } else {
        console.error("Error fetching user data: ", response.statusText);
        LogoutUser();  // If token is invalid, log out the user
      }
    } catch (error) {
      console.error("Error fetching user data: ", error);
      LogoutUser();  // If there is an error, log out the user
    } finally {
      setIsLoading(false);
    }
  };

    const getServices = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_URL_API}/api/data/service`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        console.log(data.msg);
        setServices(data.msg);
      } else {
        console.error("Error fetching services data: ", response.statusText);
      }
    } catch (error) {
      console.error(`services frontend error: ${error}`);
    }
  };
  useEffect(() => {
    getServices();
    userAuthentication();
    
    
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,  // Pass user as a part of context
        services,
        authorizationToken,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
