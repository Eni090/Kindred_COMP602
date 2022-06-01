import React from "react";
import Img from "../image.jpg";

const User = ({ user, selectUser }) => {
  return (
    <div className="user_wrapper" onClick={() => selectUser(user)}>
      <div className="user_info"></div>
      <div className="user_detail">
        <img
          src={user.profilePictures || Img}
          alt="profile"
          className="profile"
        />
        <h4>{user.name}</h4>
        <div
          className={`user_status ${user.isOnline ? "online" : "offline"}`}
        ></div>
      </div>
    </div>
  );
};

export default User;
