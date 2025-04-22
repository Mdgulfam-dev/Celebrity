import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import Campaign from "../pages/campaign/Campaign";
import Login from "../components/Login";
import Register from "../components/Register";
import PrivateRoute from "../components/PrivateRoute";
import AdminDashboard from "../admin/AdminDashboard";
import ManagerDashboard from "../manager/ManagerDashboard";
import ProfileForm from "../manager/ProfileForm";
import KYCForm from "../components/KYCForm";
import SearchResults from "../components/SearchResults";
import CelebrityDetails from "../pages/celebrityDetails/CelebrityDetails";


// const userId = localStorage.getItem("userId");
// const userId = JSON.parse(localStorage.getItem("user")) || null;


const router = createBrowserRouter([
  {
    path: "/",
    element: < App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <PrivateRoute><About /></PrivateRoute>,
      },
      {
        path: "/search",
        element: <SearchResults />
      },
      {
        path: "/celebrity/:id",
        element: <CelebrityDetails />
      },
      {
        path: "/contact",
        element: <Contact/>,
      },
      {
        path: "/campaign",
        element: <PrivateRoute><Campaign/></PrivateRoute>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register/>,
      },
      
    ],
  },
  {
    path: "/admin-dashboard",
    element: <AdminDashboard/>
  },
  {
    path: "/manager-dashboard",
    element: <ManagerDashboard/>,
    
  
  },
  {
    path:"/profile-form",
    element: <ProfileForm/>

  },
  {
    path:"/kyc-form",
    
    element:<KYCForm />
  }
  

  
]);

export default router;

