"use client";
import React, { useEffect } from "react";
import axios from "axios";
import Feedback from "../Feedback";
import FeedbackForm from "./FeedbackForm";
import { useSelector } from "react-redux";

function Feedbacks() {
  const { feedbacks } = useSelector((st) => st.app);
  useEffect(() => {console.log(feedbacks)}, [feedbacks]);
  const FeedbacksArr = [
    {
      title: "Add tags for solutions",
      main: "Easier to search for soltions based on a specific stack",
      tag: "Enhancement",
    },
    {
      title: "Add a dark theme option",
      main: "It would help with light sensitivies and who prefer dark mode",
      tag: "Feature",
    },
    {
      title: "Q&A within the challenge hubs",
      main: "Challenge specific Q&A would make for easy reference",
      tag: "Feature",
    },
  ];

  return (
    <>
      <FeedbackForm />
      {feedbacks.length && feedbacks?.map((feedback, i) => {
        const { title, body, author, _id } = feedback;
        return <Feedback title={title} main={body} author={author} key={i} id={_id} />;
      })}
    </>
  );
}

export default Feedbacks;
