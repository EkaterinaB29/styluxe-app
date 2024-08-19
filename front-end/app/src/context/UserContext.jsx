import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || null); // Initialize with

  useEffect(() => {
    if (token) {
      const fetchUserProfile = async () => {
        setLoading(true);
        console.log("tokenxx", token);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`, // Set the authorization header with the token
          },
          withCredentials: true,
        };

        try {
          // Attempt to fetch the professional profile
          const professionalResponse = await axios.get(
            "http://88.200.63.148:8211/api/user/profile/professional",
            config
          );
          setUser(professionalResponse.data);
          setRole("Professional");
          setIsAuthenticated(true);
        } catch (error) {
          console.log("Error fetching professional profile:", error);

          try {
            // If the professional profile fetch fails, try fetching the client profile
            const clientResponse = await axios.get(
              "http://88.200.63.148:8211/api/user/profile/client",
              config
            );
            setUser(clientResponse.data);
            setRole("Client");
            setIsAuthenticated(true);
          } catch (clientError) {
            console.error(
              "Error fetching client profile:",
              clientError.response
                ? clientError.response.data
                : clientError.message
            );
            setIsAuthenticated(false);
          }
        } finally {
          setLoading(false);
        }
      };

      fetchUserProfile();
    } else {
      console.error("No token found.");
      setLoading(false);
      setIsAuthenticated(false);
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        isAuthenticated,
        setUser,
        setRole,
        setIsAuthenticated,
        loading,
        setLoading,
        setToken,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
