import Book from "./Book"; // Book 컴포넌트 가져오기

function Library() {
  
  return (
    <>
      {/* 컴포넌트 만들 때 다른 컴포넌트를 조합해서 사용 가능 구성 가능 */}
      <Book name = "모던 자바스크립트" numOfPage={300} />
      <Book name = "처음 만난 리액트" numOfPage={400} />
      <Book name = "리액트를 다루는 기술" numOfPage={500} />
    </>
  );
  
}

export default Library; // Library 컴포넌트 내보내기