import React, { useState,useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
// import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Toolbar from "@mui/material/Toolbar";
import { IoStorefrontOutline } from "react-icons/io5";
import CustomListItem from "./CustomListItem";
import { MdDashboard } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FaListUl } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { BsBasketFill } from "react-icons/bs";
import { FaHeart } from "react-icons/fa6";
import { HiOutlineNewspaper } from "react-icons/hi";
import CustomLoadingAnimation from "../LoadingAnimation/loadingAnimation";
import "./Drawer.css";
import HamburgerButton from "../HamburgerButton/HamburgerButton";
import { useSnackbar } from "notistack";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const drawerWidth = 215;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [active, setActive] = useState(props.active);

  // Update state when props change
  useEffect(() => {
    setActive(props.active);
  }, [props.active]);


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
      localStorage.setItem("tokenExpirationTime", "null");
      localStorage.setItem("myPurchasesFetched", "false");
      localStorage.setItem("birds","[]");
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
          active={active.Dashboard}
          icon={<MdDashboard />}
          handleClick={() => {
            delay(280).then(() => {navigate("/dashboard");})
          }}
          closeDrawer={closeDrawer}
        />
         <CustomListItem
          text="Birds"
          active={active.Birds}
          icon={<FaListUl size={22} style={{marginBottom:"2px"}} />}
          handleClick={() => {
            delay(280).then(() => {navigate("/birds");})
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Favourites"
          active={active.Favourites}
          icon={<FaHeart size={22} />}
          handleClick={() => {
            delay(280).then(() => {navigate("/favourites");})
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="My Purchases"
          active={active.MyPurchases}
          icon={<BsBasketFill style={{marginBottom:"3px"}} />}
          handleClick={() => {
            delay(280).then(() => {navigate("/my-purchases");})
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Breed Record"
          active={active.BreedRecord}
          icon={<HiOutlineNewspaper  size={25} style={{marginBottom:"3px"}} />}
          handleClick={() => {
            delay(280).then(() => {navigate("/breed-record");})
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Profile"
          active={active.Profile}
          icon={<CgProfile />}
          handleClick={() => {
            delay(280).then(() => {navigate("/profile");})
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Settings"
          active={active.Settings}
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
      className="text-secondary mt-1"
    >
      <Toolbar />
      <Divider />
      <List sx={{px:1}}>
        <CustomListItem
          text="Dashboard"
          active={active?.Dashboard}
          icon={<MdDashboard />}
          handleClick={() => {
            setActive({Dashboard : true})
            delay(160).then(() => {navigate("/dashboard")})
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Birds"
          active={active?.Birds}
          icon={<FaListUl size={22} style={{marginBottom:"2px"}} />}
          handleClick={() => {
            setActive({Birds : true})
            delay(160).then(() => {navigate("/birds")})
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Favourites"
          active={active?.Favourites}
          icon={<FaHeart size={22} style={{marginBottom:"2px"}} />}
          handleClick={() => {
            setActive({Favourites : true})
            delay(160).then(() => {navigate("/favourites")})
          }}
          closeDrawer={closeDrawer}
        />
         <CustomListItem
          text="My Purchases"
          active={active?.MyPurchases}
          icon={<BsBasketFill style={{marginBottom:"3px"}} />}
          handleClick={() => {
            setActive({MyPurchases : true})
            delay(160).then(() => {navigate("/my-purchases");})
            
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Breed Record"
          active={active?.BreedRecord}
          icon={<HiOutlineNewspaper size={25} style={{marginBottom:"3px"}} />}
          handleClick={() => {
            setActive({BreedRecord:true})
            delay(160).then(() => {navigate("/breed-record");})
            
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Profile"
          active={active?.Profile}
          icon={<CgProfile />}
          handleClick={() => {
            setActive({Profile : true})
            delay(160).then(() => {navigate("/profile")})
          }}
          closeDrawer={closeDrawer}
        />
        <CustomListItem
          text="Settings"
          active={active?.Settings}
          icon={<IoSettingsOutline />}
          handleClick={() => {
            setActive({Settings : true})
           delay(160).then(() => {navigate("/settings")})
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
          position="absolute"
          sx={{
            position:{md:"fixed"},
            background: "#1b854a",
            height: {xs:"70px",md:"65px"},
            zIndex: 1290 /* (theme) => theme.zIndex.drawer + 1 */,  
          }}
        >
          <Toolbar>
            
            <div style={{height:"70px"}} className="d-flex justify-content-between w-100">
            <div className="d-flex mt-3 ms-md-5">
              <IoStorefrontOutline color="rgb(33, 37, 41)" size={40} />
              <h2
                style={{
                  fontFamily: "Titillium Web, sans-serif",
                  color: "rgb(33, 37, 41)",
                }}
                className="h2 ms-2 ms-md-3"
              >
                BirdsHub Inventory
              </h2>
              </div>
              <div className="justify-content-center mt-2">
            <div
          className={`menu-icon shadow align-items-center justify-content-center ${mobileOpen && "pressed"}`}
          style={{width:"52px",marginTop:"2px"}}
        >
            <HamburgerButton handleShowNavbar={handleDrawerToggle} showNavbar={mobileOpen} />
            </div>
            </div>
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
              zIndex:1289,
              display: { xs: "block", md: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
                backgroundColor:"white",
                marginTop: { xs: "12px", sm: "0px" },
                height: { xs: "calc(100% - 12px)", sm: "calc(100% - 0px)" },
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
                width: drawerWidth+15,
                marginTop: "6px",
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
            px:{md:3},
            py:{xs:4,md:3},
            width: { xs:"100%", md: `calc(100% - ${drawerWidth}px)` },
            background: "rgba(182,251,203,0.1)",
          }}
        >
          <Toolbar />
          {props.children}
        </Box>
      </Box>
    </>
  );
}

export default ResponsiveDrawer;
