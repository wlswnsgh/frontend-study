import Avatar from "./Avatar";

function formatDate(date) {
  return date.toLocaleDateString();
}

function CommentEx(props) {
  
  return (
    <>
      {/* Step 1: Avatar.jsx 추출
      아바타 이미지를 컴포넌트로 추출
      아바타 이미지는 댓글, 사용자 정보창 등 여기저기에서 쓰일 수
      있으므로
      */}
      {/* 원본 */}
      <div className="comment">
        <div className="user-info">
          <img className="avatar"
            src={props.user.avatarUrl}
            alt={props.user.name}
          />
          <div className="user-info-name">
            {props.user.name}
          </div>
        </div>

        <div className="comment-text">
          {props.text}
        </div>

        <div className="comment-date">
          {formatDate(props.date)}
        </div>
      </div>

      {/* STep */}
      <div className="comment">
        <div className="user-info">
          <Avatar 
            user = {{
              name: 'Hello Kitty',
              avatarUrl : 'http://placekitten.com/200/300'
            }}
          />
          
          <div className="user-info-name">
            {props.user.name}
          </div>
        </div>

        <div className="comment-text">
          {props.text}
        </div>

        <div className="comment-date">
          {formatDate(props.date)}
        </div>
      </div>
    </>
  );
}

export default CommentEx;