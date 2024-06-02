"use client";
import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setFeedbacks } from "@/GlobalRedux/slices/AppSlice";

export default function useUpdateFeedbacks() {
  const dispatch = useDispatch();
  async function getFeedbacks() {
    try {
      const res = await axios.get("/api/feedback");
      const updatedFeedbacks = res.data;
      dispatch(setFeedbacks(updatedFeedbacks));
    } catch (err) {
      console.log(err);
    }
  }
  return getFeedbacks;

}
