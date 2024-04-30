import React from 'react';

function Mailbox(props) {
  const unreadMessages = props.unreadMessages;

  return (
    <>
      <h1>안읽은 메일 보관함</h1>
      {/* && 뒤의 엘리먼트는 앞의 조건식이 true일 때 출력, false라면 무시하고 건너뜀 */}
      {/* 조건에 따라 특정 엘리먼트를 나타내거나 숨기고 싶을 때 사용 */}
      {unreadMessages.length > 0 && (
        <> 
          <h2>{unreadMessages.length}개의 읽지 않은 메일이 있습니다.</h2>
          {unreadMessages.map((unreadMessages, index) => {
              return <p key = {index}>제목: {unreadMessages}</p>; // key 값은 배열안에 요소를 나타내는 것을 말한다.
          })}
        </>
      )}

      {/* 주의!
        falsy이면 && 뒤에 있는 표현식은 건너뛰지만 falsy 표현식이 반환된다는 것에 주의
        (즉, falsy 표현식에 따라 화면에 출력될 수도 있음)
      */}
      {false && <h1>Messages: {unreadMessages.length}</h1>}
      {false}
      {unreadMessages.length && <h1>Messages: {unreadMessages.length}</h1>}
    </>
  );
}

export default Mailbox;