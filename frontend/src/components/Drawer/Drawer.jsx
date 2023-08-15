import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { FiMenu } from "react-icons/fi";
import { IoStorefrontOutline } from "react-icons/io5";
import CustomListItem from "./CustomListItem";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaListUl } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { BsBasketFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import CustomLoadingAnimation from "../LoadingAnimation/loadingAnimation";
import { useSnackbar } from "notistack";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 210;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();



  const handleLogout = async () => {
    const url = process.env.REACT_APP_BASE_URL + "/logout";
    try {
      setIsLoading(true);
      await axios.post(
        url,
        { message: "logout" },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      setIsLoading(false);
      enqueueSnackbar("Logged out successfully.", { variant: "success" });
      localStorage.setItem("isLoggedIn", "false");
      navigate("/login");
    } catch (err) {
      setIsLoading(false);
      if (err?.response?.data?.message) {
        enqueueSnackbar(err?.response?.data?.message, {
          variant: "error",
        });
        localStorage.setItem("isLoggedIn", "false");
        navigate("/login");
      } else {
        enqueueSnackbar("Server not working. Try again later", {
          variant: "error",
        });
      }
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const closeDrawer = () => {
    if (mobileOpen) {
      setTimeout(function () {
        setMobileOpen(false);
      }, 80);
    }
  };

  // useEffect(closeDrawer,[])

  const navigate = useNavigate();

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  const mobileDrawer = (
    <div
      style={{ fontFamily: "Titillium Web, sans-serif",backgroundColor:"white" }}
      className="text-secondary"
    >
      <Toolbar />
      <Divider />
      <List>
        <CustomListItem
          text="Dashboard"
          active={props.Dashboard}
          icon={<MdDashboard />}
          handleClick={() => {
            delay(280).then(() => {navigate("/dashboard");})
            
          }}
          closeDrawer={closeDrawer}
        />
         <CustomListItem
          text="Products"
          active={props.Products}
          icon={<FaListUl size={22} style={{marginBottom:"2px"}} />}
          handleClick={() => {
            delay(280).then(() => {navigate("/products");})
            
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Favourites"
          active={props.Favourites}
          icon={<FaHeart size={22} />}
          handleClick={() => {
            delay(280).then(() => {navigate("/favourites");})
            
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="My Products"
          active={props.MyProducts}
          icon={<BsBasketFill style={{marginBottom:"3px"}} />}
          handleClick={() => {
            delay(280).then(() => {navigate("/myProducts");})
            
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Profile"
          active={props.Profile}
          icon={<CgProfile />}
          handleClick={() => {
            delay(280).then(() => {navigate("/profile");})
            
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Settings"
          active={props.Settings}
          icon={<IoSettingsOutline />}
          handleClick={() => {
            delay(280).then(() => {navigate("/settings");})
            
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Logout"
          icon={<TbLogout size={26} />}
          handleClick={handleLogout}
          closeDrawer={closeDrawer}
        />
      </List>
    </div>
  );

  const pcDrawer = (
    <div
      style={{ fontFamily: "Titillium Web, sans-serif",backgroundColor:"white" }}
      className="text-secondary"
    >
      <Toolbar />
      <Divider />
      <List>
        <CustomListItem
          text="Dashboard"
          active={props.Dashboard}
          icon={<MdDashboard />}
          handleClick={() => {
            navigate("/dashboard")
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Products"
          active={props.Products}
          icon={<FaListUl size={22} style={{marginBottom:"2px"}} />}
          handleClick={() => {
            navigate("/products")
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Favourites"
          active={props.Favourites}
          icon={<FaHeart size={22} style={{marginBottom:"2px"}} />}
          handleClick={() => {
            navigate("/favourites")
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="My Products"
          active={props.MyProducts}
          icon={<BsBasketFill style={{marginBottom:"3px"}} />}
          handleClick={() => {
           navigate("/myProducts")
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Profile"
          active={props.Profile}
          icon={<CgProfile />}
          handleClick={() => {
            navigate("/profile")
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Settings"
          active={props.Settings}
          icon={<IoSettingsOutline />}
          handleClick={() => {
           navigate("/settings")
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Logout"
          icon={<TbLogout size={26} />}
          handleClick={handleLogout}
          closeDrawer={closeDrawer}
        />
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {isLoading && <CustomLoadingAnimation />}

      <Box sx={{ display: "flex" }}>
        {/* <CssBaseline /> */}
        <AppBar
          position="fixed"
          sx={{
            background: "#1b854a",
            height: "66px",
            zIndex: 9999 /* (theme) => theme.zIndex.drawer + 1 */,
          }}
        >
          <Toolbar>
            <IconButton
              color="rgb(33, 37, 41)"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ ml: "2px", mr: 2, display: { md: "none" } }}
            >
              <FiMenu size={48} />
            </IconButton>

            <div className="d-none d-lg-flex mt-2 ms-5">
              <IoStorefrontOutline color="rgb(33, 37, 41)" size={40} />
              <h2
                style={{
                  fontFamily: "Titillium Web, sans-serif",
                  color: "rgb(33, 37, 41)",
                }}
                className="h2 ms-3"
              >
                KisaanApp Store
              </h2>
            </div>
          </Toolbar>
        </AppBar>

        <Box
          component="nav"
          sx={{
            width: { md: drawerWidth },
            flexShrink: { md: 0 },
          }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            sx={{
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor:"white",
                marginTop: { xs: "8px", sm: "0px" },
                height: { xs: "calc(100% - 8px)", sm: "calc(100% - 0px)" },
              },
            }}
          >
            {mobileDrawer}
          </Drawer>

          <Drawer
          className="shadow-custom"
            variant="permanent"
            sx={{
              display: { xs: "none", md: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                marginTop: "2px",
                background: "white",
              },
            }}
            open
          >
            {pcDrawer}
          </Drawer>
        </Box>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { xs:"100%", md: `calc(100% - ${drawerWidth}px)` },
            background: "rgba(182,251,203,0.1)",
          }}
        >
          <Toolbar />
          {props.children}
          {/* {active.dashboard
            ? props.Dashboard
            : active.allProducts
            ? props.AllProducts
            : active.categories
            ? props.Categories
            : active.myProducts
            ? props.MyProducts
            : active.mProfile
            ? props.MyProfile
            : props.Settings} */}
        </Box>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
