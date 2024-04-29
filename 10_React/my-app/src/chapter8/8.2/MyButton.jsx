// rsf
import React from 'react';

function MyButton(props) {

  const handleDelete = (id) => {
    console.log(`ID: ${id} 삭제됨`);

  };

  return (
    <>
      {/* 컴포넌트가 마운트 될 때 함수가 바로 실행된다. */}
      {/* 이 후 버튼을 눌러도 함수가 실행이 안된다. onclick={undefined}와 동일*/}
      {/* 즉시 실행 */}
      <button type='button' onClick={handleDelete(1)}> 
        삭제하기(잘못된 방법)
      </button>

      <br />
      {/* 이벤트 핸들러에 첫번째 매개변수로 들어오는 값은 event 객체임 */}
      {/* 인자값이 있을 때 올바른 방식 */}
      {/* 익명함수 */}
      <button type='button' onClick={(e) => {
        console.log(e); // 이벤트 객체(발생한 이벤트에 관련한 여러 기능이 담겨있음)
        console.log(e.target); // 현재 발생한 이벤트 대상(여기서는 button DOM 요소)
        handleDelete(1);
      }}> 삭제하기</button>

    </>

  );
}

export default MyButton;