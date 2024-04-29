// rsc
// rsf
import React, { useState } from 'react';

function Toggle(props) {
  let [On, SetOn] = useState(); // [초기값, 상태변경 함수]

    // 방법 1. 함수 선언문 사용
    // function handleToggle() {
    //   SetOn(!On);
    // }

    // 방법 2. 함수 선언문 사용
    const handleToggle = () => {
      SetOn(!On);
    }

  return (
    // 이벤트는 카멜 케이스(camelCase)를 사용
    // 함수(이벤트 핸들러)를 바로 전달하면 됨
    // 주의! handleToggle()로 작성 시 함수가 바로 호출됨
    <button type='button' onClick={handleToggle}>{On ? '켜짐' : '꺼짐'}</button>
  );
}

export default Toggle;