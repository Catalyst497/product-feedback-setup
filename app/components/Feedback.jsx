import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronUp, FaComment } from "react-icons/fa";
import useScreenSize from "../hooks/useScreenSize";
import useUpdateFeedbacks from "../hooks/useUpdateFeedbacks";
import { BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";

function Feedback({ title, main, author, id }) {
  const dispatch = useDispatch();
  const { isMobile } = useScreenSize();
  const getUpdatedFeedbacks = useUpdateFeedbacks()
  const { user } = useSelector((state) => state.user);
  const [openFeedbackOptions, setOpenFeedbackOptions] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [feedbackUpdate, setFeedbackUpdate] = useState({
    title: title,
    body: main,
    author: author,
    id: id,
  });
  const parentRef = useRef(null);
  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (
      parentRef.current &&
      parentRef.current .contains(e.target) &&
      menuRef.current &&
      !menuRef.current.contains(e.target)
    ) {
      setOpenFeedbackOptions(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const deleteFeedback = async () => {
    const response = await axios.delete(`/api/feedback/${id}`);
    console.log(response);
    if (response.data === "Feedback deleted successfully.") {
      getUpdatedFeedbacks();
      setOpenFeedbackOptions(false);
    }
  };

  const editFeedback = async () => {
    if (!feedbackUpdate.title) return alert("Title cannot be empty.");
    if (!feedbackUpdate.body) return alert("Please fill all fields.");
    console.log(id);
    const response = await axios.put("/api/feedback", feedbackUpdate);
    console.log(response);
    if (response.data === "Feedback updated successfully.") {
      getUpdatedFeedbacks();
      setOpenFeedbackOptions(false);
      setEditMode(false);
    }
  };
  return (
    <div ref={parentRef} className="feedback">
      <div className="flex justify-between gap-4 md:gap-6">
        <div
          className={
            isMobile ? `flex flex-col justify-start items-center gap-10` : ""
          }
        >
          <div className="upvote-count flex flex-col items-center text-lightblue bg-faintblue p-2 md:p-4 rounded-lg gap-2 font-bold">
            <FaChevronUp />
            <div>112</div>
          </div>
        </div>
        <div className="feedback-content flex-1">
          <div
            className={`profile flex  mb-4 ${
              !isMobile ? "gap-4" : "flex-col gap-2"
            }`}
          >
            <div className={`avatar ${isMobile ? "flex gap-4" : ""}`}>
              <img
                src="./avatar.jpg"
                alt=""
                className="avatar-img w-[2rem] md:w-[3rem] rounded-[40%]"
              />
              {isMobile && (
                <div className="text-[1.2rem] font-bold text-darkblue capitalize">
                  {author.username}
                </div>
              )}
            </div>
            <div>
              {!isMobile && (
                <div className="text-[1.2rem] font-bold text-darkblue capitalize">
                  {author.username}
                </div>
              )}
              <div className="text-darkgray">Monday Dec 20th, 2021</div>
            </div>
          </div>
          {editMode && <div className="text-darkgray">Title:</div>}
          <div
            className={`feedback-title ${
              !editMode && "font-bold text-[1.2rem] text-darkblue"
            }`}
          >
            {editMode ? (
              <input
                defaultValue={title}
                onChange={(e) =>
                  setFeedbackUpdate({
                    ...feedbackUpdate,
                    title: e.target.value,
                  })
                }
                className={`border-solid border-faintblue border-[2px] outline-none rounded-lg mb-4 ${
                  isMobile ? "w-full" : "w-[70%]"
                }`}
              />
            ) : (
              <span>{title}</span>
            )}
          </div>
          {editMode && <div className="text-darkgray">Body:</div>}
          {editMode ? (
            <textarea
              defaultValue={main}
              onChange={(e) =>
                setFeedbackUpdate({ ...feedbackUpdate, body: e.target.value })
              }
              className={`border-solid border-faintblue border-[2px] outline-none rounded-lg mb-4 ${
                isMobile ? "w-full" : " w-[70%]"
              }`}
            />
          ) : (
            <p className="feedback-main py-2">{main}</p>
          )}
          {editMode && (
            <button
              className="block px-4 py-2 bg-purple rounded-lg text-white border-none"
              onClick={editFeedback}
            >
              Submit
            </button>
          )}
          {/* <div className="tag py-2">
            <div className="px-4 py-2 rounded-lg bg-faintblue text-lightblue inline-block font-bold">
              tag
            </div>
          </div>   */}
        </div>
        {user.id == author._id && (
          <div
            ref={menuRef}
            className={`feedback-menu relative md:self-center ${
              isMobile ? "mt-3" : "mr-4"
            }`}
          >
            {openFeedbackOptions && (
              <ul
                className={`absolute bg-white rounded-lg p-2 text-black ${
                  isMobile ? "top-[20%] -left-[200%]" : "top-full -left-full"
                }  z-10 drop-shadow-lg`}
              >
                <li
                  onClick={() => {
                    setEditMode(true);
                    setOpenFeedbackOptions(false);
                  }}
                  className="py-2 px-4 cursor-default"
                >
                  Edit
                </li>
                <hr className="text-center" />
                <li
                  className="text-red-600 py-2 px-4 cursor-default"
                  onClick={() => deleteFeedback()}
                >
                  Delete
                </li>
              </ul>
            )}
            <div className="flex gap-4 items-center">
              <BsThreeDots
                size={isMobile ? 28 : 32}
                onClick={() => setOpenFeedbackOptions(!openFeedbackOptions)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Feedback;
