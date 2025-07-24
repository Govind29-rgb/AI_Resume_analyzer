import React from "react";
import { Link } from "react-router-dom"; // Correct import for Link in web apps
import ScoreCircle from "./ScoreCircle"; // Assuming you have a ScoreCircle component

//extracting the props
//de-structuring the props from resume 
const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback,imagePath } }) => {
  return (
    // animation added here for reload
    <Link
      to={`/resume/${id}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black font-bold break-words">{companyName}</h2>
          <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>
        </div>
        {/* svg circle..higher the circle..higher the rating */}
        {/* this is a react component..scorecicrle.tsx */}
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>        

      {/* resume image following */}
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full">
          <img
            src={imagePath}
            alt="resume"
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
