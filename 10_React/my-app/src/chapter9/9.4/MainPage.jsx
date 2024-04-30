import React, { useState } from 'react';

const styles = {
  button: {
    height: 40,
    width: 200,
  },
  warning: {
    backgroundColor: '#ffc107',
    textAlign: 'center',
    width: '100%',
    padding: 10,
    fontSize: '14pt',
    color: '#000',
  },
  danger: {
    backgroundColor: '#dc3545',
    textAlign: 'center',
    width: '100%',
    padding: 10,
    fontSize: '14pt',
    color: '#fff',
  }
};

function WarningBanner(props) {
  console.log(props.warn);
  // props.warn이 false라면 null을 리턴하기때문에 컴포넌트는 랜더링되지 않음.

  if (!props.warn) {
    return null;
  }

  return <div style={styles.warning}>Warrning!</div>;
}

function DangerBanner(props) {
  return <div style={styles.danger}>Danger!</div>;
}

function MainPage(props) {

  const [showWarring, setShowWarring] = useState(false);

  const handleToggle = () => {
    setShowWarring(!showWarring);
  };

  return (

    <>
      {/* 조건에 따라 랜더링 막기 */}
      <WarningBanner warn = {showWarring} />
      {/* Q: 조건에 따라 렌더링 막기 */}
      {showWarring && <DangerBanner /> }
      {showWarring ? <DangerBanner /> : null}

      <button type='button' style={styles.button} onClick={handleToggle}>{showWarring ? '감추기' : '보이기'}</button>
    </>
  );
}

export default MainPage;