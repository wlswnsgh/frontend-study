import React, { useState } from 'react';
import Greeting from '../9.1/Greeting';

function LoginButton(props) {
  return <button type='button' onClick={props.onClick}>로그인</button>
}

function LogoutButton(props) {
  return <button type='button' onClick={props.onClick}>로그아웃</button>
}

function LoginControlRefactoring(props) {
  const [isLoggodin, setIsLoggodin] = useState(false);

  const bandleLogin = () => {
    setIsLoggodin(true);
  };

  const handleLogout = () => {
    setIsLoggodin(false);
  };

  // 2단계: if문 사용 + button 변수에 컴포넌트를 대입
  // (참고) JSX 내부에서 조건부 랜더링해도 됨. 근데 JSX 내부에서는 if문 사용 불가
  // => 삼항 연산자 또는 논리 연산자로 대체 가능하다.

  return (
    <>
      {/* Greeting 컴포넌트의 재사용 */}
      <Greeting isLoggodin={isLoggodin} />
      {/* 삼항 연산자로 if-else 구분을 jsx 내부에서 표현*/}
      {/* 조건에 따라 각기 다른 엘리먼트를 렌더링하고 싶을 때 사용 */}
      {isLoggodin ? <LogoutButton onClick = {handleLogout} />: <LoginButton onClick = {bandleLogin} />}
      
    </>
  );
}

export default LoginControlRefactoring;