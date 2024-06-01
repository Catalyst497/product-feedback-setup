import React from "react";
import Image from "next/image";
import HeaderCard from "./HeaderCard";
import FilterCategories from "./FilterCategories";
import Roadmap from "./Roadmap";
import ProfileBox from "./ProfileBox";

function SideBar() {
  return (
    <div className="sidebar">
      <ProfileBox />
      <HeaderCard />
      <FilterCategories />
      <Roadmap />
    </div>
  );
}

export default SideBar;
