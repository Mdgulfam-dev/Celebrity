import React, { useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";


const Navbar = () => {
  
  const [token, setToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    setToken(null); 
    navigate("/login"); 
  };

  return (
    <div className="container py-2">
      <nav className="navbar">
      <div className="navbar-brand">
        <Link className="navbar-item" to="/manager-dashboard">
          <h1 className="is-size-3 has-text-warning">Celeb</h1>
          

        </Link>
      </div>
      <div className="navbar-menu">
        <div className="navbar-end is-gap-2">
          {token ? (
            <>
              <button
                className="button is-hovered is-size-6"
                onClick={() => navigate("/profile-form")}
              >
                Create Profile
              </button>
              <button
                className="button is-hovered is-size-6"
                onClick={() => navigate("/kyc-form")}
              >
                KYC Complete
              </button>
              <button className="button is-hovered  is-size-6 " onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <a className="button  is-hovered  is-size-6" href="/login">
              Login
            </a>
          )}
        </div>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
