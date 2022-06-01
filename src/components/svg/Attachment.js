import { grey } from "@mui/material/colors";
import { color } from "@mui/system";
import React from "react";

const Attachment = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{
        width: "25px",
        height: "25px",
        cursor: "pointer",
        color: "gray",
      }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
      />
    </svg>
  );
};

export default Attachment;
