import React from "react";

import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Icon } from "@mui/material";

const CustomListItem = (props) => {
  return (
    <ListItem onClick={props.handleClick} key={props.text} disablePadding>
      <ListItemButton
        sx={
          props.active
            ? {
                borderRadius: "3px",
                borderLeft: 5,
                borderColor: "#0d522c",
                background: "rgba(182,251,203,0.7)",
                color: "black",
                transition: "all 0.16s ease-out",
                "&:hover": {
                  background: "rgb(182,251,203)",
                  color: "black",
                },
              }
            : {
                color: "#000000ba",
                transition: "all 0.15s ease",
                "&:hover": {
                  color: "black",
                },
              }
        }
        onClick={props.closeDrawer}
      >
        <Icon
          sx={{
            height: "40px",
            ...(props.active && { color: "#0d522c" }),
          }}
        >
          {props.icon}
        </Icon>
        <ListItemText
          primaryTypographyProps={{ fontSize: "22px", marginLeft: 2 }}
          primary={props.text}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default CustomListItem;
