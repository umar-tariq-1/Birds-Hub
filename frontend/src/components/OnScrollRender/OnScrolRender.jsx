import React from "react";
import { withScroll } from "react-fns";

const OnScrollRender = ({ x, y }) => {
  if (y > 580) {

    return (<>
        </>);
  } else {
    return <></>;
  }
};

export default withScroll(OnScrollRender);
