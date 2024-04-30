import { useState } from 'react';

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

function Toolbar(props) {
  // 사용자의 로그인 여부를 상태로 관리
  let {isLoggodin, onClickLogin, onClickLogout} = props; // 객체 구조 분해 할당
  

  return (
    <div style={styles.wrapper}>
      {isLoggodin && <span style={styles.greeting}>환영합니다!</span>}
      {isLoggodin
        ? <button type='button' onClick={onClickLogout}>로그아웃</button>
        : <button type='button' onClick={onClickLogin}>로그인</button>
      }
    </div>
    

  );
}



export default Toolbar;