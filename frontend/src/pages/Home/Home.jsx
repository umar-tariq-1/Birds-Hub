import HomeContent from "./homecontent";
import HomeFeatures from "./homefeatures";
import Navbar from "../../components/Navbar/navbar";
import React from "react";

export default function Home() {
  return (
    <div>
      <Navbar Home={1} />
      <HomeContent />
      <HomeFeatures />
    </div>
  );
}
