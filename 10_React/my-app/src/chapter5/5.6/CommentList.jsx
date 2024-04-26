import React from 'react';
import Comment from './Comment';

const comments = [
  {
    name: '유',
    content: '메뚜기 월드~'
  },
  {
    name: '재',
    content: '사마귀 월드~'
  },
  {
    name: '석',
    content: '애벌레 월드~'
  },
];

function CommentList(props) {
  return (

    <div>
      {/* <Comment />
      <Comment />
      <Comment /> */}

      {/* Quiz: props를 사용하여 name과 content 값 전달(데이터는 자유롭게 작성) */}
      {/* <Comment name = 'jin' content = 'Hello' />
      <Comment name = 'jun' content = 'World'/>
      <Comment name = 'ho' content = '!!!!!!'/> */}

      {/* 배열을 동적으로 랜더링해야 할 때에는 배열의 map() 함수를 사용
      일반 데이터 배열을 리액트 엘리먼트로 이루어진 배열로 만들면 됨*/}
      {/* {comments.map((comment, index) => {
        console.log(comment, index);
        return <Comment name ={comment.name} content ={comment.content} />;
      }) } */}

      {/* map() 함수의 결과 */}
      {
        [
          <Comment key={0} name = {'재'} content = {'리액트 ~!'}/>,
          <Comment key={1} name = {'유'} content = {'후~!'}/>,
          <Comment key={2} name = {'석'} content = {'어렵고만~!'}/>
        ]
      }

      {/* 함수 줄이기 예) */}
      {comments.map((comment, index) => <Comment name ={comment.name} content ={comment.content} /> )}
    </div>

  );
}

export default CommentList;
