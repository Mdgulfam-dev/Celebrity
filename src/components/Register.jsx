import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("User"); 

  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    console.log("Registering with Name:", name, "Email:", email, "Password:", password, "Role:", role);
    
    try {
      const response = await fetch("http://localhost:4000/api/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();
      if (data.success) {
        
        navigate("/");
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  return (
    <section className="has-background-black">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-half my-6">
            <form onSubmit={handleSubmit} className="box">
              <h1 className="title has-text-centered">Register</h1>
              
              {/* Name Field */}
              <div className="field">
                <label htmlFor="name" className="label">Name</label>
                <div className="control">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      console.log("Name input changed to:", e.target.value);
                    }}
                    required
                  />
                </div>
              </div>
              
              {/* Email Field */}
              <div className="field">
                <label htmlFor="email" className="label">Email</label>
                <div className="control has-icons-left">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      console.log("Email input changed to:", e.target.value);
                    }}
                    required
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
              </div>
              
              {/* Password Field */}
              <div className="field">
                <label htmlFor="password" className="label">Password</label>
                <div className="control has-icons-left">
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
                  <span className="icon is-small is-left">
                    <i className="fas fa-lock"></i>
                  </span>
                </div>
              </div>

              {/* Role Selection Dropdown */}
              <div className="field">
                <label htmlFor="role" className="label">Select Role</label>
                <div className="control">
                  <div className="select">
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
              </div>
              
              {/* Submit Button */}
              <div className="field">
                <div className="control">
                  <button type="submit" className="button is-primary is-fullwidth">
                    Register
                  </button>
                </div>
              </div>
              
              {/* Login Redirect */}
              <div>
                <p className="my-3">
                  Already have an account?{" "}
                  <span 
                    onClick={() => navigate('/login')} 
                    className="has-text-link is-clickable"
                  >
                    Login here
                  </span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
