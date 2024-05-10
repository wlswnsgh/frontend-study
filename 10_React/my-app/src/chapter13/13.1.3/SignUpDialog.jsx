import Dialog from "./Dialog";
import React, { useState } from "react";

function SignUpDialog() {
  const [Name, setName] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  }

  const ClickWorld = () => {
    alert(`${Name}님 환영합니다.`);
  }

  return (
    <Dialog
      title = "화성 탐사 프로그램"
      message = "당신의 이름은?"
    >
      
      {/* 내 풀이 */}
      {/* <form onSubmit={ClickWorld}>
      <input type="text" value={Name}  onChange={handleName}/>
      <button type="submit">가입하세요!</button>
      </form> */}

      {/* 선생님 풀이 */}
      <input type="text" value={Name}  onChange={handleName}/>
      <button type="button" onClick={ClickWorld}>가입하세요!</button>
    </Dialog>
  );
};

export default SignUpDialog;