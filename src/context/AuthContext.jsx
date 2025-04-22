// import React, { createContext, useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [token, setToken] = useState(null);
//   const [user, setUser] = useState(null);
//   // const [kycStatus, setKycStatus] = useState(null);

//   const navigate = useNavigate();


//   useEffect(() => {
//     console.log("AuthProvider: Initializing state from localStorage...");
//     const storedToken = localStorage.getItem("token");
//     const storedUser = localStorage.getItem("user");
//     // const storedKycStatus = localStorage.getItem(`kycStatus_${user?.id}`);

//     if (storedToken && storedUser) {
//     setToken(storedToken);
//     setUser(JSON.parse(storedUser));
//     // setKycStatus(storedKycStatus); // Restore KYC status on page reload
//   }

//     if (storedToken && storedUser) {
//       console.log("AuthProvider: Found stored token and user.");
//       setToken(storedToken);
//       setUser(JSON.parse(storedUser));
//     } else {
//       console.log("AuthProvider: No stored token or user found.");
//     }
//   }, []);

  

//   const login = useCallback((newToken, userData) => {
//     try {
//       localStorage.setItem("token", newToken);
//       localStorage.setItem("user", JSON.stringify(userData));
//       setToken(newToken);
//       setUser(userData);
//     } catch (error) {
//       console.error("Failed to save to localStorage:", error);
//     }
//   }, []);

//   const logout = useCallback(() => {
//     try {
//       // Clear all auth-related data
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       localStorage.removeItem("userData");
//       localStorage.removeItem("userId");

//       // Clear all KYC-related data
//       const userId = localStorage.getItem("userId");
//       if (userId) {
//         localStorage.removeItem(`kycStatus_${userId}`);
//       }
//       // Remove any other potential KYC status keys
//       Object.keys(localStorage).forEach(key => {
//         if (key.startsWith('kycStatus_')) {
//           localStorage.removeItem(key);
//         }
//       });

//       setToken(null);
//       setUser(null);
//       navigate("/login");
//     } catch (error) {
//       console.error("Failed to clear localStorage:", error);
//     }
//   }, [navigate]);

//   const isAuthenticated = token !== null && user !== null;

  


//   return (
//     <AuthContext.Provider
//       value={{ token, user, login, logout, isAuthenticated }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;
import React, { createContext, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = useCallback((newToken, userData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    navigate("/login");
  }, [navigate]);

  const isAuthenticated = token !== null && user !== null;
  
  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
