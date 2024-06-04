"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useScreenSize from "./hooks/useScreenSize";
import useAuthorize from "./hooks/useAuthorize";
import Loader from "./components/Loader";
import SideMenu from "./components/SideMenu";
import SideBar from "./components/Home/SideBar";
import Main from "./components/Home/Main";
import MainMobile from "./components/Home/MainMobile";
import NavMobile from "./components/Home/NavMobile";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { isDesktop, isMobile, isTablet } = useScreenSize();
  const authFunc = useAuthorize();

  useEffect(() => {
    async function checkAuth() {
      try {
        const authStatus = await authFunc();
        if (authStatus === true) {
          setLoading(false);
        } else {
          router.push("/login");
        }
      } catch (err) {
        router.push("/login");
        console.log(err);
      }
    }
    checkAuth();
  }, []);
  if (loading) return <Loader />;
  return (
    <div className="md:flex md:justify-center">
      {isMobile && <SideMenu />}
      {isMobile && <NavMobile />}

      <div
        className={`page flex gap-4  ${isDesktop && "w-[80%]"} ${
          isTablet && "w-[90%]"
        } ${!isMobile && "mt-20 mb-20"}`}
      >
        {!isMobile ? (
          <>
            <SideBar />
            <Main />
          </>
        ) : (
          <MainMobile />
        )}
      </div>
    </div>
  );
}
