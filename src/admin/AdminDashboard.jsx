import React, { useEffect, useState } from "react";
import { getUsers } from "../admin/api/users.js";
import UserList from "./UserList";
import AdminNavbar from "../components/AdminNavbar.jsx";
import Analytics from "../components/adminAnalytics.jsx";
import AnalyticsChart from "../components/AnalyticsChart.jsx";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Load the logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setCurrentUser(storedUser);
    }

    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="p-6">
      <AdminNavbar />
      <h2 className="is-size-3 has-text-weight-bold has-text-centered py-4">
        Welcome, {currentUser ? currentUser.name : "Admin"}!
      </h2>
      <UserList users={users} refreshUsers={fetchUsers} />
      <Analytics />
      <AnalyticsChart />
    </div>
  );
};

export default AdminDashboard;
