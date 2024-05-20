import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* align-items: flex-start; */
  justify-content: center;

  & > *:not(:last-child) {
    margin-bottom: 16px;
  }
`;


// 글의 제목만 표시해주는 컴포넌트
function CommentList() {
  
  return (
    <>
    </>
  );
};

export default CommentList;