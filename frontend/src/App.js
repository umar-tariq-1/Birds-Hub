import React, { Suspense, /* lazy, */ useEffect } from "react";
import { lazyWithPreload } from "react-lazy-with-preload";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop/ScrollToTop";
import Home from "../src/pages/Home/Home";
import CustomLoadingAnimation from "./components/LoadingAnimation/loadingAnimation";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// import SignUp from "./pages/SignUp/signUp";
// import Login from "./pages/Login/login";
// import Contact from "./pages/Contact/contact";
// import About from "./pages/About/about";
// import MainPage from "../src/pages/Auth/MainPage/MainPage";

import Dashboard from "./pages/Auth/Dashboard/Dashboard";
import Birds from "./pages/Auth/Birds/Birds";
import MyPurchases from "./pages/Auth/MyPurchases/MyPurchases";
import Favourites from "./pages/Auth/Favourites/Favourites";
import Profile from "./pages/Auth/Profile/Profile";
import Settings from "./pages/Auth/Settings/Settings";
import BreedRecord from "./pages/Auth/BreedRecord/BreedRecord";

const SignUpComponent = lazyWithPreload(() => import("./pages/SignUp/signUp"));
const LoginComponent = lazyWithPreload(() => import("./pages/Login/login"));
const ContactComponent = lazyWithPreload(() =>
  import("./pages/Contact/contact")
);
const AboutComponent = lazyWithPreload(() => import("./pages/About/about"));

// const DashboardComponent = lazyWithPreload(() =>
//   import("./pages/Auth/Dashboard/Dashboard")
// );
// const ProductsComponent = lazyWithPreload(() =>
//   import("./pages/Auth/Birds/Birds")
// );
// const MyProductsComponent = lazyWithPreload(() =>
//   import("./pages/Auth/MyBirds/MyBirds")
// );
// const FavouritesComponent = lazyWithPreload(() =>
//   import("./pages/Auth/Favourites/Favourites")
// );
// const ProfileComponent = lazyWithPreload(() =>
//   import("./pages/Auth/Profile/Profile")
// );
// const SettingsComponent = lazyWithPreload(() =>
//   import("./pages/Auth/Settings/Settings")
// );

function App() {
  useEffect(() => {
    SignUpComponent.preload();
    LoginComponent.preload();
    AboutComponent.preload();
    ContactComponent.preload();
    // MainPageComponent.preload();
  }, []);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { cacheTime: 1000 * 60 * 60 * 48, retry: false },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Suspense
          fallback={<CustomLoadingAnimation overlayColor={"rgba(0,0,0,0.1)"} />}
        >
          <Routes>
            <Route path="/" exact Component={Home} />
            <Route path="/signup" Component={SignUpComponent} />
            <Route path="/login" Component={LoginComponent} />
            <Route path="/about" Component={AboutComponent} />
            <Route path="/contact" Component={ContactComponent} />
            <Route path="/dashboard" Component={Dashboard} />
            <Route path="/birds" Component={Birds} />
            <Route path="/my-purchases" Component={MyPurchases} />
            <Route path="/breed-record" Component={BreedRecord} />
            <Route path="/favourites" Component={Favourites} />
            <Route path="/profile" Component={Profile} />
            <Route path="/settings" Component={Settings} />
            {/* <Route path="/*" Component={Page404} /> */}
          </Routes>
        </Suspense>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
