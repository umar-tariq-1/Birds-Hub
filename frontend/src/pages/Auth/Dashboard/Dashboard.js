import React from "react";
import ResponsiveDrawer from "../../../components/Drawer/Drawer";

const Dashboard = () => {
  return (
    <ResponsiveDrawer active={{ Dashboard: true }}>
      <div className="d-flex justify-content-center align-items-center h1">
        Dashboard
      </div>
    </ResponsiveDrawer>
  );
};

export default Dashboard;
