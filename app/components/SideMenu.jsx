"use client";
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProfileBox from "./Home/ProfileBox";
import { MdClose } from "react-icons/md";
import { setSideBarOpen } from "@/GlobalRedux/slices/AppSlice";

function SideMenu() {
  const dispatch = useDispatch();
  const { sideBarOpen } = useSelector((st) => st.app);
  const sideMenu = useRef(null);

  useEffect(() => {
    sideMenu.current.classList.toggle("translate-x-[100%]");
  }, [sideBarOpen]);
  return (
    <>
      {sideBarOpen && (
        <div className="fixed overlay inset-0 bg-black/50 z-[9990]"></div>
      )}
      <div
        ref={sideMenu}
        className={`side-menu fixed z-[9999] top-0 bottom-0 right-0 bg-[#f7f8fd] p-8 translate-x-[100%] duration-300 `}
      >
        <MdClose
          className="absolute left-4 top-4"
          size={28}
          onClick={() => {
            console.log('Function is called.')
            dispatch(setSideBarOpen(false))}}
        />
        <ProfileBox />
      </div>
    </>
  );
}

export default SideMenu;
