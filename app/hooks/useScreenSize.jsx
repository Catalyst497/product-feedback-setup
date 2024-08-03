"use client";
import React, { useState, useEffect } from "react";

function useScreenSize() {
    const [screenSize, setScreenSize] = useState(
      typeof window !== "undefined" ? window.innerWidth : 0
    );
    const [breakpoints, setBreakpoints] = useState({
      isMobile: typeof window !== "undefined" ? window.innerWidth < 767 : false,
      isTablet:
        typeof window !== "undefined"
          ? window.innerWidth >= 767 && window.innerWidth < 991
          : false,
      isDesktop: typeof window !== "undefined" ? window.innerWidth >= 991 : false,
    });
  
  useEffect(() => {
    setBreakpoints({
      isMobile: screenSize < 767,
      isTablet: screenSize > 767 && screenSize < 991,
      isDesktop: screenSize > 991,
    })
  }, [screenSize]);
  useEffect(() => {
    const handleSizeChange = () => setScreenSize(window.innerWidth);
    handleSizeChange();
    document.addEventListener("resize", handleSizeChange);
    return document.removeEventListener("resize", handleSizeChange);
  }, []);
  return breakpoints;
}

export default useScreenSize;
