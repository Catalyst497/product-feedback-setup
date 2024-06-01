import React from "react";
import { ProgressBar } from "react-loader-spinner";
import useScreenSize from "../hooks/useScreenSize";

function Loader() {
  const {isMobile, isTablet, isDesktop} = useScreenSize()
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <ProgressBar
        visible={true}
        height="250"
        width={isMobile ? '80%': '250'}
        barColor="#ae1feb"
        ariaLabel="progress-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        borderColor={""}
        loop={false}
      />
    </div>
  );
}

export default Loader;
