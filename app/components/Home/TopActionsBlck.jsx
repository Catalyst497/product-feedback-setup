"use client";
import React, { useEffect, useState } from "react";
import { FaLightbulb, FaChevronDown } from "react-icons/fa";
import useScreenSize from "../../hooks/useScreenSize";
import { useDispatch, useSelector } from "react-redux";
import { setFeedbackFormOpen } from "@/GlobalRedux/slices/AppSlice";

function TopActionsBlck() {
  const dispatch = useDispatch();
  const { feedbackFormOpen } = useSelector((state) => state.app);
  const { isMobile, isTablet, isDesktop } = useScreenSize();
  const addFeedback = () => {
    dispatch(setFeedbackFormOpen());
  };

  return (
    <nav className="flex gap-2 md:gap-10 items-center px-4 py-2 md:py-5 md:px-4 justify-between bg-darkblue text-white md:rounded-lg">
      {!isMobile && (
        <div className="flex gap-6 items-center">
          <span>
            <FaLightbulb size={24} className="" />
          </span>
          <span className="font-bold">6 suggestions</span>
        </div>
      )}
      <div className="flex-1">
        <span className="opacity-70">Sort by: </span>Most Upvotes{" "}
        <FaChevronDown className="inline-block" />
      </div>
      <button
        className="bg-purple px-4 py-2 rounded-lg"
        onClick={() => addFeedback()}
      >
        + Add Feedback
      </button>
    </nav>
  );
}

export default TopActionsBlck;
