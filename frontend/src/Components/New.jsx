import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StarRatingH = ({ user }) => {
  const totalStars = 5;
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starIndex) => {
    setRating(starIndex + 1);
  };
  const toastify = () => {
    toast.error("Please LognIn First", {
      position: "bottom-right",
      style: { backgroundColor: "#EEEEEE", color: "black", fontWeight: "bold" },
    });
  };

  const handleStarHover = (starIndex) => {
    setHoverRating(starIndex + 1);
  };
  const postComment = () => {
    if (user == undefined) {
      toastify();
      console.log("toast");
      return;
    }
  };
  const handleStarLeave = () => {
    setHoverRating(0);
  };

  const renderStar = (index) => {
    const isFull =
      index < rating || (index === rating - 0.5 && rating % 1 !== 0);
    const isHover =
      index < hoverRating ||
      (index === hoverRating - 0.5 && hoverRating % 1 !== 0);

    const starColor = isFull || isHover ? "text-yellow-500" : "text-gray-300";

    return (
      <span
        key={index}
        className={`text-2xl cursor-pointer ${starColor}`}
        onClick={() => handleStarClick(index)}
        onMouseEnter={() => handleStarHover(index)}
        onMouseLeave={handleStarLeave}
      >
        {isFull ? "\u2605" : isHover ? "\u2605" : "\u2606"}
      </span>
    );
  };
  const [comment, setComment] = useState("");
  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  return (
    <div>
      {Array.from({ length: totalStars }, (_, index) => renderStar(index))}
      <div className="flex mt-3">
        <textarea
          placeholder="Add your comment..."
          value={comment}
          onChange={handleCommentChange}
        />
        <div className="ml-4 mt-3">
          <button
            onClick={postComment}
            className="border-2 bg-blue-500 rounded-md text-white w-16 hover:bg-blue-400"
          >
            Post
          </button>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default StarRatingH;
