import React, { useState } from 'react';
import Toolbar from './Toolbar';

const styles = {
  wrapper: {
    padding: 16,
    display: 'flex',
    flexDirection: 'row',
    borderBottom: '1px solid gray'
  },
  greeting: {
    marginRight: 8
  },
};

function LandingPage(props) {
  const [isLoggodIn, setIsLoggodIn] = useState(false);

  const handleClickLogin = () => {
    setIsLoggodIn(true);
  };

  const handleClickLogout = () => {
    setIsLoggodIn(false);
  }; 

  return (
    <div>
      <Toolbar 
        // Quiz: 로그인 상태와 이벤트 핸들러를 툴바 컴포넌트로 넘겨 로그인 여부에 따라 툴바의 렌더링이 바뀌도록 구현
        isLoggodIn = {isLoggodIn}
        onClickLogin =  {handleClickLogin}
        onClickLogout =  {handleClickLogout}
      />
      
    <div style={{ padding: 16 }}>💻리엑트 공부 사이트</div>
      {/* Quiz:
        로그인/로그아웃 버튼을 누를 때마다 isLoggedIn 값이 바뀌고
        로그인/로그아웃 버튼이 바뀌도록 조건부 렌더링
        로그인 상태이면 인사말이 나오도록 조건부 렌더링
      */}
    </div>
  );
}

export default LandingPage;