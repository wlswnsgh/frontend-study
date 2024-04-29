import React, { useState } from 'react';
import Greeting from '../9.1/Greeting';

function LoginButton(props) {
  return <button type='button' onClick={props.onClick}>로그인</button>
}

function LogoutButton(props) {
  return <button type='button' onClick={props.onClick}>로그아웃</button>
}

function LoginControl(props) {
  const [isLoggodin, setIsLoggodin] = useState(false);

  const bandleLogin = () => {
    setIsLoggodin(true);
  };

  const handleLogout = () => {
    setIsLoggodin(false);
  };

  let button;
  if (isLoggodin) {
    button = <LogoutButton onClick={handleLogout}/>;
  } else {
    button = <LoginButton onClick={bandleLogin}/>;
  }

  // 2단계: if문 사용 + button 변수에 컴포넌트를 대입

  return (
    <>
      {/* Greeting 컴포넌트의 재사용 */}
      <Greeting isLoggodin={isLoggodin} />
      {button}
    </>
  );
}

export default LoginControl;