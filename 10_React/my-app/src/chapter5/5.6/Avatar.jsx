import React from 'react';

function Avatar(props) {
  console.log(props);
  return (
    // Comment에서만 쓰이는게 아니기에 author에서 user로 바꿔줌
    <div>
      <img className="avatar"
        src={props.user.avatarUrl}
        alt={props.user.name}
        style={{
          width: 100,
          height: 100,
          borderRadius: '100%'
        }}
      />
    </div>


  );
}

export default Avatar;