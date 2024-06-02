"use client";
import React, { useEffect } from "react";
import axios from "axios";
import Feedback from "../Feedback";
import FeedbackForm from "./FeedbackForm";
import { useSelector } from "react-redux";

function Feedbacks() {
  const { feedbacks } = useSelector((st) => st.app);
  useEffect(() => {console.log(feedbacks.slice().reverse())}, [feedbacks]);

  return (
    <>
      <FeedbackForm />
      {feedbacks.length && feedbacks?.slice().reverse().map((feedback, i) => {
        const { title, body, author, _id } = feedback;
        return <Feedback title={title} main={body} author={author} key={i} id={_id} />;
      })}
    </>
  );
}

export default Feedbacks;
