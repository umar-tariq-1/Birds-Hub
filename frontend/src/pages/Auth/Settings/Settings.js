import React from "react";
import ResponsiveDrawer from "../../../components/Drawer/Drawer";

const Settings = () => {
  return (
    <ResponsiveDrawer Settings={1}>
      <div className="d-flex justify-content-center align-items-center h1">
        Settings
      </div>
    </ResponsiveDrawer>
  );
};

export default Settings;
