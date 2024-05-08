function PostDetail(props) {
  const {posts, currentIndex, setposts} = props;
  
  return (
    <div className="detail">
      <h4>제목: {posts[currentIndex]}</h4>
      {/* {posts[currentIndex]} */}
      <p>날짜: 2023년 1월 20일</p>
      <p>작성자: junho.jin</p>
      <p>...상세내용...</p>

      {/* 간단한 포스트 수정하기 */}
      <button type="button"
      onClick={() => {
        // 배열이나 객체의 state를 변경하는 법
        // 새로운 배열 또는 객체를 만들어 변경하고 set함수에 넣어줘여 함.
        const copyPosts = [...posts]; // 배열의 복사본 만들기
        copyPosts[currentIndex] =  `${copyPosts[currentIndex]} - 수정됨`;
        setposts(copyPosts);

        // state 변경할 때 알아야 할 것!
        // 1. state 변경 함수의 특징
        // 기존 state가 신규 state랑 같은 경우, 변경 안함
        // 2. 배열/객체의 특징
        // 변수에 주소(참조)값이 저장됨
      }}
      >수정하기
      </button>
    </div>
  );
};

export default PostDetail;