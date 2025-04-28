// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { IoSearchOutline } from "react-icons/io5";
// import logoImg from "../assets/logo.jpg";
// import { AuthContext } from "../context/AuthContext";

// const navigation = [
//   { name: "Home", path: "/" },
//   { name: "About", path: "/about" },
//   { name: "Campaign", path: "/campaign" },
//   { name: "Help", path: "/contact" },
//   { name: "Login", path: "/login" },
// ];

// const Navbar = () => {
//   const [isNavbarActive, setIsNavbarActive] = useState(false);
//   const [isDropdownActive, setIsDropdownActive] = useState(false);

//   const { isAuthenticated, logout } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();

//     navigate("/login");
//   };

//   const toggleNavbar = () => {
//     setIsNavbarActive(!isNavbarActive);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownActive(!isDropdownActive);
//   };

//   return (
//     <section>
//       <header>
//         <div className="container">
//           <nav
//             className="navbar has-background-black px-6 py-3"
//             role="navigation"
//             aria-label="main navigation"
//           >
//             {/* Navbar Brand (Left Side) */}
//             <div className="navbar-brand">
//               <Link to="/" className="navbar-item">
//                 <img
//                   src={logoImg}
//                   alt="Company Logo"
//                   style={{ width: "70px", height: "70px" }}
//                 />

//               </Link>

//               {/* Mobile Search Box (Optional) */}
//               <div className="navbar-item is-hidden-tablet">
//                 <div className="field">
//                   <div className="control has-icons-left">
//                     <input
//                       type="text"
//                       className="input"
//                       placeholder="Search here"
//                     />
//                     <span className="icon is-small is-left">
//                       <IoSearchOutline className="is-size-4 has-text-white" />
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Mobile Navbar Burger (visible only on mobile) */}
//               <button
//                 type="button"
//                 className={`navbar-burger burger is-hidden-tablet ${
//                   isNavbarActive ? "is-active" : ""
//                 }`}
//                 aria-label="menu"
//                 aria-expanded={isNavbarActive ? "true" : "false"}
//                 onClick={toggleNavbar}
//               >
//                 <span aria-hidden="true" style={{ background: "white" }}></span>
//                 <span aria-hidden="true" style={{ background: "white" }}></span>
//                 <span aria-hidden="true" style={{ background: "white" }}></span>
//               </button>
//             </div>

//             {/* Navbar Menu */}
//             <div className={`navbar-menu ${isNavbarActive ? "is-active" : ""}`}>
//               {/* Desktop Navigation (Left Side) */}
//               <div className="navbar-start is-hidden-touch">
//                 {navigation.slice(0, 4).map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.path}
//                     className="navbar-item has-text-white"
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>

//               {/* Desktop Right Side */}
//               <div className="navbar-end is-hidden-touch">
//                 <div className="navbar-item">
//                   {isAuthenticated ? (
//                     <>
//                       <button
//                         className="button  ml-2 is-size-"
//                         onClick={() => navigate("/kyc-form")}
//                       >
//                         KYC Complete
//                       </button>

//                       <button className="button" onClick={handleLogout}>
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     // If not authenticated, show a dropdown for login/register actions
//                     <div
//                       className={`dropdown ${
//                         isDropdownActive ? "is-active" : ""
//                       }`}
//                     >
//                       <div className="dropdown-trigger">
//                         <button
//                           className="button"
//                           aria-haspopup="true"
//                           aria-controls="dropdown-menu"
//                           onClick={toggleDropdown}
//                         >
//                           <span>Register/Login</span>
//                           <span className="icon is-small">
//                             <i
//                               className="fas fa-angle-down"
//                               aria-hidden="true"
//                             />
//                           </span>
//                         </button>
//                       </div>
//                       <div
//                         className="dropdown-menu"
//                         id="dropdown-menu"
//                         role="menu"
//                       >
//                         <div className="dropdown-content">
//                           <Link
//                             to="/login"
//                             className="dropdown-item"
//                             onClick={() => setIsDropdownActive(false)}
//                           >
//                             Login
//                           </Link>
//                           <Link
//                             to="/register"
//                             className="dropdown-item"
//                             onClick={() => setIsDropdownActive(false)}
//                           >
//                             Register
//                           </Link>
//                           <hr className="dropdown-divider" />
//                           <p className="pl-4">Welcome Celeb</p>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Mobile Navigation (Collapsible Dropdown) */}
//               <div className="navbar-start is-hidden-desktop">
//                 {navigation.map((item) => (
//                   <Link
//                     key={item.name}
//                     to={item.path}
//                     className="navbar-item"
//                     onClick={() => setIsNavbarActive(false)}
//                   >
//                     {item.name}
//                   </Link>
//                 ))}
//               </div>
//             </div>
//           </nav>
//         </div>
//       </header>
//     </section>
//   );
// };

// export default Navbar;

// -------------------------------


// import React, { useContext, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { IoSearchOutline } from "react-icons/io5";
// import logoImg from "../assets/logo1.jpg";
// import { AuthContext } from "../context/AuthContext";

// const Navbar = () => {
//   const [isNavbarActive, setIsNavbarActive] = useState(false);
//   const [isDropdownActive, setIsDropdownActive] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");

//   const { isAuthenticated, logout, user } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   const toggleNavbar = () => {
//     setIsNavbarActive(!isNavbarActive);
//   };

//   const toggleDropdown = () => {
//     setIsDropdownActive(!isDropdownActive);
//   };

//   const onSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim()) {
//       navigate(`/search?query=${searchQuery}`);
//     }
//   };

//   return (
//     <section className="has-background-black">
//       <header >
//         <div className="container pt-3">
//           <nav
//             className="navbar has-background-black px-6 py-3"
//             role="navigation"
//             aria-label="main navigation"
//           >
//             {/* Navbar Brand */}
//             <div className="navbar-brand">
//               {/* <Link to="/" className="navbar-item">
//                 <img src={logoImg} className="circle-logo" alt="Company Logo" style={{ width: "70px", height: "70px" }} />
//               </Link> */}

//               <Link
//                 to="/"
//                 className="navbar-item"
//                 style={{ padding: "0.1rem" }}
//               >
//                 <figure
//                   style={{
                    
//                     height: "60px",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <img
//                     src={logoImg}
//                     alt="Company Logo"
//                     style={{
//                       maxHeight: "70px",
//                       width: "auto",
//                       objectFit: "contain",
//                       borderRadius: "12px",
//                       boxShadow: "0 4px 16px rgba(0, 153, 255, 0.3)",
//                       transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                     }}
//                     className="is-clickable"
//                     onMouseOver={(e) => {
//                       e.currentTarget.style.transform = "scale(1.05)";
//                       e.currentTarget.style.boxShadow =
//                         "0 0 20px rgba(0, 153, 255, 0.5)";
//                     }}
//                     onMouseOut={(e) => {
//                       e.currentTarget.style.transform = "scale(1)";
//                       e.currentTarget.style.boxShadow =
//                         "0 4px 16px rgba(0, 153, 255, 0.3)";
//                     }}
//                   />
//                 </figure>
//               </Link>

//               {/* Mobile Search */}
//               <div className="navbar-item is-hidden-tablet">
//                 <form onSubmit={onSearch} className="field">
//                   <div className="control has-icons-left">
//                     <input
//                       type="text"
//                       className="input"
//                       placeholder="Search here"
//                       value={searchQuery}
//                       onChange={(e) => setSearchQuery(e.target.value)}
//                     />
//                     <span className="icon is-small is-left">
//                       <IoSearchOutline className="is-size-4 has-text-white" />
//                     </span>
//                   </div>
//                 </form>
//               </div>

//               {/* Burger Button */}
//               <button
//                 type="button"
//                 className={`navbar-burger burger is-hidden-tablet ${
//                   isNavbarActive ? "is-active" : ""
//                 }`}
//                 aria-label="menu"
//                 aria-expanded={isNavbarActive}
//                 onClick={toggleNavbar}
//               >
//                 <span aria-hidden="true" style={{ background: "white" }}></span>
//                 <span aria-hidden="true" style={{ background: "white" }}></span>
//                 <span aria-hidden="true" style={{ background: "white" }}></span>
//               </button>
//             </div>

//             {/* Navbar Menu */}
//             <div className={`navbar-menu ${isNavbarActive ? "is-active" : ""}`}>
//               <div className="navbar-start is-hidden-touch">
//                 <form onSubmit={onSearch} className="navbar-item">
//                   <div className="field">
//                     <div className="control has-icons-left">
//                       <input
//                         type="text"
//                         className="input"
//                         placeholder="Search here"
//                         value={searchQuery}
//                         onChange={(e) => setSearchQuery(e.target.value)}
//                       />
//                       <span className="icon is-small is-left">
//                         <IoSearchOutline className="is-size-4 has-text-white" />
//                       </span>
//                     </div>
//                   </div>
//                 </form>
//               </div>

//               {/* Right Side */}
//               <div className="navbar-end">
//                 {isAuthenticated && (
//                   <div className="navbar-item has-text-white">
//                     Welcome, {user?.name || "User"}
//                   </div>
//                 )}

//                 <div className="navbar-item">
//                   {isAuthenticated ? (
//                     <>
//                       <button
//                         className="button ml-2"
//                         onClick={() => navigate("/kyc-form")}
//                       >
//                         KYC Complete
//                       </button>
//                       <button className="button" onClick={handleLogout}>
//                         Logout
//                       </button>
//                     </>
//                   ) : (
//                     <div
//                       className={`dropdown ${
//                         isDropdownActive ? "is-active" : ""
//                       }`}
                      
                      
//                     >
//                       <div className="dropdown-trigger">
//                         <button
//                           className="button"
//                           onClick={toggleDropdown}
//                           aria-haspopup="true"
//                           aria-controls="dropdown-menu"
//                         >
//                           <span>Register/Login</span>
//                           <span className="icon is-small">
//                             <i className="fas fa-angle-down" />
//                           </span>
//                         </button>
//                       </div>
//                       <div
//                         className="dropdown-menu"
//                         id="dropdown-menu"
//                         role="menu"
                        
//                       >
//                         <div className="dropdown-content">
//                           <Link
//                             to="/login"
//                             className="dropdown-item"
//                             onClick={() => setIsDropdownActive(false)}
//                           >
//                             Login
//                           </Link>
//                           <Link
//                             to="/register"
//                             className="dropdown-item"
//                             onClick={() => setIsDropdownActive(false)}
//                           >
//                             Register
//                           </Link>
//                           <hr className="dropdown-divider" />
//                           <p className="pl-4">Welcome Celeb</p>
//                         </div>
//                       </div>
//                     </div>
                    
//                   )}
//                 </div>
//               </div>
//             </div>
//           </nav>
//         </div>
//       </header>
//     </section>
//   );
// };

// export default Navbar;



// <---------WORKING--------->

import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
import logoImg from "../assets/logo1.jpg";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isNavbarActive, setIsNavbarActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { isAuthenticated, logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleNavbar = () => {
    setIsNavbarActive(!isNavbarActive);
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${searchQuery}`);
    }
  };

  return (
    <nav className="navbar has-background-black" role="navigation" aria-label="main navigation">
      <div className="container">
        {/* Navbar Brand */}
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <figure
              style={{
                height: "60px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={logoImg}
                alt="Company Logo"
                style={{
                  maxHeight: "70px",
                  width: "auto",
                  objectFit: "contain",
                  borderRadius: "12px",
                  boxShadow: "0 4px 16px rgba(0, 153, 255, 0.3)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                className="is-clickable"
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.05)";
                  e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 153, 255, 0.5)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(0, 153, 255, 0.3)";
                }}
              />
            </figure>
          </Link>

          {/* Burger */}
          <button
            className={`navbar-burger ${isNavbarActive ? "is-active" : ""}`}
            aria-label="menu"
            aria-expanded={isNavbarActive}
            onClick={toggleNavbar}
          >
            <span aria-hidden="true" style={{ background: "white" }}></span>
            <span aria-hidden="true" style={{ background: "white" }}></span>
            <span aria-hidden="true" style={{ background: "white" }}></span>
          </button>
        </div>

        {/* Navbar Menu */}
        <div className={`navbar-menu ${isNavbarActive ? "is-active" : ""}`}>
          {/* Left Side */}
          <div className="navbar-start">
            {/* Search (Visible on desktop) */}
            <div className="navbar-item is-hidden-touch">
              <form onSubmit={onSearch} className="field">
                <div className="control has-icons-left">
                  <input
                    type="text"
                    className="input"
                    placeholder="Search here"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <IoSearchOutline className="is-size-4 has-text-white" />
                  </span>
                </div>
              </form>
            </div>

            {/* Search (Mobile view) */}
            <div className="navbar-item is-hidden-desktop">
              <form onSubmit={onSearch} className="field">
                <div className="control has-icons-left">
                  <input
                    type="text"
                    className="input"
                    placeholder="Search here"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <span className="icon is-small is-left">
                    <IoSearchOutline className="is-size-4 has-text-white" />
                  </span>
                </div>
              </form>
            </div>
          </div>

          {/* Right Side */}
          <div className="navbar-end">
            {isAuthenticated && (
              <div className="navbar-item has-text-white">
                Welcome, {user?.name || "User"}
              </div>
            )}

            {/* Buttons */}
            <div className="navbar-item">
              {isAuthenticated ? (
                <div className="buttons">
                  <button className="button is-info" onClick={() => navigate("/kyc-form")}>
                    KYC Complete
                  </button>
                  <button className="button is-light" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : (
                <div className="navbar-item has-dropdown is-hoverable">
                  <Link className="navbar-link">Register/Login</Link>

                  <div className="navbar-dropdown is-right">
                    <Link to="/login" className="navbar-item">
                      Login
                    </Link>
                    <Link to="/register" className="navbar-item">
                      Register
                    </Link>
                    <hr className="navbar-divider" />
                    <div className="navbar-item">
                      Welcome Celeb
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
