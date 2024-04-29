import React, { useState } from 'react';

function ConfirmButton(props) {
  let [Seton, SETongle] = useState(false);
  // set함수는 비동기로 처리된다. (set은 비동기 함수)
  // console.log(Seton);
  console.log(Seton); // true

  return (
    // false가 두개일 때 참이 되므로 비활성화 (disabled은 속성)
    <>
      <button type='button'  onClick={() => {
        SETongle(!Seton); 
      }} disabled = {Seton}>{Seton ? '확인됨' : '확인하기 '}</button>
    </>
  );
}

export default ConfirmButton;
// Quiz: 사용자에게 확인을 요구하는 버튼 컴포넌트
//  버튼을 누르면 '확인하기' '확인됨'으로 변경되면서 버튼 비화설화