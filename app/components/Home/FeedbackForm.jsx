"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import useScreenSize from "../../hooks/useScreenSize";
import {
  setFeedbackFormOpen,
} from "@/GlobalRedux/slices/AppSlice";
import useUpdateFeedbacks from "../../hooks/useUpdateFeedbacks";
import axios from "axios";

function FeedbackForm() {
  const dispatch = useDispatch();
  const getUpdatedFeedbacks = useUpdateFeedbacks()
  const { feedbackFormOpen } = useSelector((st) => st.app);
  const { user } = useSelector((st) => st.user);
  const { isMobile, isTablet, isDesktop } = useScreenSize();

  const [feedback, setFeedback] = useState({
    title: "",
    body: "",
    author: "",
  });

  useEffect(() => {
    setFeedback({ ...feedback, author: user });
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    try {
      const res = await axios.post("/api/feedback", feedback);
      console.log(res);
      if (res.data === "New Feedback successsfully saved.") {
        getUpdatedFeedbacks()
        setFeedback({
          title: "",
          body: "",
          author: user,
        });
        dispatch(setFeedbackFormOpen(false));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {feedbackFormOpen ? (
        <div className="feedback-form-container bg-white flex justify-center py-6 mt-4 rounded-lg">
          <form
            action=""
            className={`feedback-form ${
              !isMobile ? "flex" : ""
            } gap-6 *:border-green-500 w-[90%]`}
          >
            <div className="flex-1">
              <input
                type="text"
                placeholder="Input the Title of your Feedback"
                className="block bg-lightgray px-4 py-2 w-full"
                value={feedback.title}
                onChange={(e) =>
                  setFeedback({ ...feedback, title: e.target.value })
                }
              />
              <textarea
                name=""
                id=""
                cols="30"
                rows="5"
                className="bg-lightgray mt-4 rounded-lg w-full px-4 py-2"
                placeholder="Body of your feedback goes here."
                value={feedback.body}
                onChange={(e) =>
                  setFeedback({ ...feedback, body: e.target.value })
                }
              ></textarea>
            </div>
            <div className="flex">
              <button
                type="submit"
                className="button-hollow-black self-end mb-2"
                onClick={(e) => handleFormSubmit(e)}
              >
                Submit Feedback
              </button>
            </div>
          </form>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}

export default FeedbackForm;
