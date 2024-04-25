import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import JsxUse from './chapter3/3.4/jsxUse';
import Library from './chapter3/3.4/Library';
import Clock from './chapter4/Clock';
import PropUse from './chapter5/5.3/PropsUse';
import Layout from './chapter5/5.3/Layout';
const root = ReactDOM.createRoot(document.getElementById('root'));

// Root DOM Node에 리액트 컴포넌트를 렌더링 하도록 하는 함수(React 엘리먼트를 DOM 엘리먼트로 렌더링하는 역할)
// 처음으로 렌더링할 컴포넌트를 지정하는데 App 컴포넌트가 기본적으로 들어가있음
root.render(
    

    // 3장 예제
    <>
    {/* <App /> */}
    <JsxUse />
    <Library />
    <PropUse />
    </>

);



// 4장 예제
// 1초마다 Clock 컴포넌트를 랜더링 하는 코드
// setInterval(() => {
//     root.render(<Clock />);
// }, 1000);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
