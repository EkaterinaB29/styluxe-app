import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = Cookies.get('token');
    if (token) {
      const fetchUserProfile = async () => {
        try {
          const professionalResponse = await axios.get('http://88.200.63.148:8211/api/user/profile/professional', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setUser(professionalResponse.data);
          setRole('Professional');
          setIsAuthenticated(true);
        } catch (error) {
          try {
            const clientResponse = await axios.get('http://88.200.63.148:8211/api/user/profile/client', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setUser(clientResponse.data);
            setRole('Client');
            setIsAuthenticated(true);
          } catch (error) {
            console.error('Error fetching profile data:', error.response ? error.response.data : error.message);
            setIsAuthenticated(false);
          }
        }
      };
      fetchUserProfile();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, role, isAuthenticated, setUser, setRole, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
