import React from "react";
import Avatar from "./Avatar";

function UserInfo(props) {
  return (
    <div className="user-info">
      {/* Avatar 안에 있는 props.user.name, props.user.avatarUrl를 쓸 수 있다.  */}
      {/* <Avatar user = {props.user} />  */}
      <div className="user-info-name" >
        {props.user.name}
      </div>
      <div className="comment-text">
        {props.user.text}
      </div>
    </div>
  );
}

export default UserInfo;