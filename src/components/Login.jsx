// import { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext"; 

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext); 
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("User");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     console.log("Clearing old session data...");
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("userId");
//     localStorage.removeItem("kycStatus");
//     localStorage.clear();
    
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log("Attempting login with:", { email, password });

//     try {
//       const response = await fetch("http://localhost:4000/api/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, role }),
//       });

//       const data = await response.json();
//       console.log("Response from server:", data);

//       if (data.success) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         localStorage.setItem("userId", data.user.id);

//         login(data.token, data.user);

//         setIsLoggedIn(true);
//         console.log("Stored user:", localStorage.getItem("user"));

//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("An error occurred during login.");
//     }
//   };

//   // UseEffect to Redirect after State Update
//   useEffect(() => {
//     if (isLoggedIn) {
//       const storedUser = JSON.parse(localStorage.getItem("user"));
//       if (storedUser?.role === "Admin") {
//         navigate("/admin-dashboard");
//       } else if (storedUser?.role === "Manager") {
//         navigate("/manager-dashboard");
//       } else {
//         navigate("/");
//       }
//     }
//   }, [isLoggedIn, navigate]); // Runs when isLoggedIn changes

//   return (
//     <section className="has-background-black">
//       <div className="container">
//         <div className="columns is-centered">
//           <div className="column is-half my-6">
//             <form onSubmit={handleSubmit} className="box">
//               <h1 className="title has-text-centered">Login</h1>

//               <div className="field">
//                 <label htmlFor="email" className="label">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   name="email"
//                   className="input"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="field">
//                 <label htmlFor="password" className="label">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   name="password"
//                   className="input"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="field">
//                 <label htmlFor="role" className="label">Select Role</label>
//                 <div className="select is-fullwidth">
//                   <select
//                     id="role"
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                   >
//                     <option value="User">User</option>
//                     <option value="Manager">Manager</option>
//                     <option value="Admin">Admin</option>
//                   </select>
//                 </div>
//               </div>

//               <button type="submit" className="button is-primary is-fullwidth">
//                 {isLoggedIn ? "Redirecting..." : "Login"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Login;

// import { useEffect, useState, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("User");
//   const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);

//   useEffect(() => {
//     localStorage.clear();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch("http://localhost:4000/api/user/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password, role }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));
//         localStorage.setItem("userId", data.user.id);
//         login(data.token, data.user);
//         setShowWelcomeOverlay(true);
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       alert("An error occurred during login.");
//     }
//   };

//   const handleVisitClick = () => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser?.role === "Admin") {
//       navigate("/admin-dashboard");
//     } else if (storedUser?.role === "Manager") {
//       navigate("/manager-dashboard");
//     } else {
//       navigate("/");
//     }
//   };

//   return (
//     <section className="has-background-black vh-100">
//       <div className="container">
//         <div className="columns is-centered">
//           <div className="column is-half my-6">
//             <form onSubmit={handleSubmit} className="box animate__animated animate__fadeInDown">
//               <h1 className="title has-text-centered">Login</h1>

//               <div className="field">
//                 <label htmlFor="email" className="label">Email</label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="input"
//                   placeholder="Enter your email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="field">
//                 <label htmlFor="password" className="label">Password</label>
//                 <input
//                   type="password"
//                   id="password"
//                   className="input"
//                   placeholder="Enter your password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                 />
//               </div>

//               <div className="field">
//                 <label className="label">Select Role</label>
//                 <div className="select is-fullwidth">
//                   <select value={role} onChange={(e) => setRole(e.target.value)}>
//                     <option value="User">User</option>
//                     <option value="Manager">Manager</option>
//                     <option value="Admin">Admin</option>
//                   </select>
//                 </div>
//               </div>

//               <button type="submit" className="button is-primary is-fullwidth mt-4">
//                 Login
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>

//      {showWelcomeOverlay && (
//   <div
//     className="overlay animate__animated animate__fadeIn"
//     style={{
//       position: "fixed",
//       top: 0,
//       left: 0,
//       width: "100vw",
//       height: "100vh",
//       background: "rgba(0, 0, 0, 0.8)",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       zIndex: 1000,
//       backdropFilter: "blur(8px)",
//     }}
//   >
//     <div
//       style={{
//         background: "rgba(255, 255, 255, 0.1)",
//         padding: "3rem",
//         borderRadius: "20px",
//         border: "1px solid rgba(255, 255, 255, 0.2)",
//         boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
//         color: "#fff",
//         textAlign: "center",
//         maxWidth: "400px",
//         backdropFilter: "blur(20px)",
//         transition: "transform 0.5s ease",
//       }}
//     >
//       <h1 className="title is-3 has-text-white mb-2 animate__animated animate__zoomIn">
//         🎉 Welcome to Celeb Media,
//         <br />
//         <span style={{ color: "#FFD700", fontWeight: "bold" }}>
//           {JSON.parse(localStorage.getItem("user"))?.name || "User"}!
//         </span>
//       </h1>
//       <p className="mb-4 animate__animated animate__fadeInUp">
//         You’ve logged in successfully. Ready to explore?
//       </p>
//       <button
//         onClick={handleVisitClick}
//         className="button is-warning is-medium animate__animated animate__pulse"
//       >
//         Visit Dashboard
//       </button>
//     </div>
//   </div>
// )}

//     </section>
//   );
// };

// export default Login;


// ---------------------

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"; 

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcomeOverlay, setShowWelcomeOverlay] = useState(false);

  useEffect(() => {
    console.log("Clearing old session data...");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("kycStatus");
    localStorage.clear();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Attempting login with:", { email, password });

    try {
      const response = await fetch("http://localhost:4000/api/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();
      console.log("Response from server:", data);

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // localStorage.setItem("userId", data.user.id); // ✅ ADD THIS LINE
        localStorage.setItem("userId", data.user.id);

        login(data.token, data.user);

        setIsLoggedIn(true);
        setShowWelcomeOverlay(true);
        console.log("Stored user:", localStorage.getItem("user"));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  const handleVisitClick = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser?.role === "Admin") {
      navigate("/admin-dashboard");
    } else if (storedUser?.role === "Manager") {
      navigate("/manager-dashboard");
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      
      // Redirect is now handled via the overlay's button
    }
  }, [isLoggedIn, navigate]);

  return (
    <section className="has-background-black vh-100">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half my-6">
            <form onSubmit={handleSubmit} className="box animate__animated animate__fadeInDown">
              <h1 className="title has-text-centered">Login</h1>

              <div className="field">
                <label htmlFor="email" className="label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="password" className="label">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <div className="field">
                <label htmlFor="role" className="label">Select Role</label>
                <div className="select is-fullwidth">
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="User">User</option>
                    <option value="Manager">Manager</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>

              <button type="submit" className="button is-primary is-fullwidth">
                {isLoggedIn ? "Redirecting..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Welcome Overlay */}
      {showWelcomeOverlay && (
        <div
          className="overlay animate__animated animate__fadeIn"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0, 0, 0, 0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(8px)",
          }}
        >
          <div
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              padding: "3rem",
              borderRadius: "20px",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)",
              color: "#fff",
              textAlign: "center",
              maxWidth: "400px",
              backdropFilter: "blur(20px)",
              transition: "transform 0.5s ease",
            }}
          >
            <h1 className="title is-3 has-text-white mb-2 animate__animated animate__zoomIn">
              🎉 Welcome to Celeb Media,
              <br />
              <span style={{ color: "#FFD700", fontWeight: "bold" }}>
                {JSON.parse(localStorage.getItem("user"))?.name || "User"}!
              </span>
            </h1>
            <p className="mb-4 animate__animated animate__fadeInUp">
              You’ve logged in successfully. Ready to explore?
            </p>
            <button
              onClick={handleVisitClick}
              className="button is-warning is-medium animate__animated animate__pulse"
            >
              Visit Dashboard
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Login;
