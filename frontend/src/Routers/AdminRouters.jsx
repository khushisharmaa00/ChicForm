import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Admin from "../Admin/Admin";
import { useSelector } from "react-redux";

const AdminRouters = () => {
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("User in AdminRouters:", user);

    if (loading) return; // Wait until user is loaded

    if (!user) {
      console.log("User is undefined or null");
      navigate("/");
    } else if (user.role !== "ADMIN") {
      console.log("User is not an admin, role found:", user.role);
      navigate("/");
    }
  }, [user, loading, navigate]);
  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner while fetching user details
  }

  return (
    <div>
      <Routes>
        <Route path="/*" element={<Admin />}></Route>
      </Routes>
    </div>
  );
};

export default AdminRouters;
