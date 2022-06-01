import { color } from "@mui/system";
import React from "react";

const Del = ({ deleteImg }) => {
  return (
    <svg
      onClick={deleteImg}
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "25px", height: "25px", cursor: "pointer", color: "red" }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
};

export default Del;
