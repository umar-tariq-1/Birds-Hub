import React from "react";

import ResponsiveDrawer from "../../../components/Drawer/Drawer";

const Categories = () => {
  return (
    <ResponsiveDrawer Favourites={1}>
      <div className="d-flex justify-content-center align-items-center h1">
        Categories
      </div>
    </ResponsiveDrawer>
  );
};

export default Categories;
