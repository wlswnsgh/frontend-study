import React from 'react';
import Comment from './Comment';

function CommentList(props) {
  return (
    <div>
      {/* <Comment />
      <Comment />
      <Comment /> */}

      {/* Quiz: props를 사용하여 name과 content 값 전달(데이터는 자유롭게 작성) */}
      <Comment name = 'jin' content = 'Hello' />
      <Comment name = 'jun' content = 'World'/>
      <Comment name = 'ho' content = '!!!!!!'/>
    </div>
  );
}

export default CommentList;