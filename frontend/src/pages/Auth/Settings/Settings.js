import React from "react";
import ResponsiveDrawer from "../../../components/Drawer/Drawer";

const Settings = () => {
  return (
    <ResponsiveDrawer active={{ Settings: true }}>
      <div className="d-flex justify-content-center align-items-center h1">
        Settings
      </div>
    </ResponsiveDrawer>
  );
};

export default Settings;
