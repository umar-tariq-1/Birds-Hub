import React, { useState } from "react";
import AddBird from "./AddBird";
import ResponsiveDrawer from "../../../components/Drawer/Drawer";

const MyBirds = () => {
  return (
    <ResponsiveDrawer MyBirds={1}>
      <AddBird />
      {/* <CustomLoadingAnimation /> */}
    </ResponsiveDrawer>
  );
};

export default MyBirds;
