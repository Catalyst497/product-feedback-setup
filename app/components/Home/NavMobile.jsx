'use client'
import React from "react";
import { useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";
import TopActionsBlck from "./TopActionsBlck";
import { setSideBarOpen } from "@/GlobalRedux/slices/AppSlice";

function NavMobile() {
  const dispatch = useDispatch()
  return (
    <>
      <nav className="mobile-top-nav flex justify-between items-center ">
        <div className="">
          <div className="text-[1.2rem] font-medium">Frontend Mentor</div>
          <div className="opacity-60">Feedback Board</div>
        </div>
        <div>
          <FaBars size={28} onClick={() => dispatch(setSideBarOpen(true))} />
        </div>
      </nav>
      <TopActionsBlck />
    </>
  );
}

export default NavMobile;
