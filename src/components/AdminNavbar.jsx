// import { Link } from 'react-router-dom'

// const AdminNavbar = () => {
  
//     const handleLogout = () => {
//         localStorage.removeItem("token");
//         window.location.href = "/login";
//     }
//   return (
//     <div>
//       <nav className="">
//         <div className="container mx-auto is-flex is-flex-direction-row is-justify-content-space-between is-align-items-center py-2 px-4">
//             <Link to="/admin-dashboard" className="text-white font-bold text-xl">
//                 <h1 className='has-text-white is-size-3 has-text-weight-bold' >Celeb</h1>
                 
//             </Link>
//             <div className="space-x-4">
//                 <button className="button is-white" onClick={handleLogout}>
//                     Logout
//                 </button>
                
//             </div>
//         </div>
//       </nav>
//     </div>
//   )
// }

// export default AdminNavbar
import React, { useState } from "react";
import { Link } from "react-router-dom";


const AdminNavbar = () => {
  const [isActive, setIsActive] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar is-dark is-fixed-top shadow animated-fade-in" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/admin-dashboard" className="navbar-item">
          <h1 className="has-text-weight-bold is-size-4 has-text-white"> Celeb</h1>
        </Link>

        <Link
          role="button"
          className={`navbar-burger ${isActive ? "is-active" : ""}`}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarMenu"
          onClick={() => setIsActive(!isActive)}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </Link>
      </div>

      <div id="navbarMenu" className={`navbar-menu ${isActive ? "is-active" : ""}`}>
        <div className="navbar-end">
          <div className="navbar-item">
            <button className="button is-warning is-rounded has-text-weight-semibold animated-hover" onClick={handleLogout}>
               Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
