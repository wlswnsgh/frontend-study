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
import EX from './chapter5/5.3/Ex';
import CommentEx from './chapter5/5.6/CommentEX';
import Avatar from './chapter5/5.6/Avatar';
import UserInfo from './chapter5/5.6/UserInfo';
import CommentList from './chapter5/5.6/CommentList';
import Counter from './chapter7/7.2/Counter';
import Toggle from './chapter8/8.1/Toggle';
import MyButton from './chapter8/8.2/MyButton';
import ConfirmButton from './chapter8/ConfirmButton';
import Greeting from './chapter9/9.1/Greeting';
import LoginControl from './chapter9/9.2/LoginControl';
import Mailbox from './chapter9/9.3/Mailbox';
import LoginControlRefactoring from './chapter9/9.3/LoginControlRefactoring';
import MainPage from './chapter9/9.4/MainPage';
import LandingPage from './chapter9/LandingPage';
import Numberlist from './chapter10/10.1/Numberlist';
import ListKey from './chapter10/10.2/ListKey';
import AttendanceBook from './chapter10/AttendanceBook';
import Toolbar from './chapter9/Toolbar';
import NameForm from './chapter11/11.2/NameForm';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Root DOM Node에 리액트 컴포넌트를 렌더링 하도록 하는 함수(React 엘리먼트를 DOM 엘리먼트로 렌더링하는 역할)
// 처음으로 렌더링할 컴포넌트를 지정하는데 App 컴포넌트가 기본적으로 들어가있음
root.render(
    
    // 3장 예제
    <>
    {/* <App /> */}
    {/* <JsxUse /> */}
    {/* <Library /> */}
    {/* <PropUse /> */}
    {/* <CommentEx 
        date = {new Date()} // 날짜
        text = "리액트를 즐기세요!"
        user = {{
                name: 'Hello Kitty',
                avatarUrl : 'http://placekitten.com/200/300'
            }}
    />

    
    <UserInfo 
        text = "이해했어욧!!!!!!!!!!!!!!!!"
        user = {{ 
            name: "Hello World"
        }}
    /> */}

    {/* <CommentList /> */}

    {/* 예제 7 */}
    {/* <Counter /> */}

    {/* <Toggle /> */}
    {/* <MyButton /> */}
    {/* <ConfirmButton /> */}
    {/* <Greeting isLoggodin = {true} />
    <Greeting isLoggodin = {false} />
    <LoginControl />
    <Mailbox unreadMessages = {['hello', 'world', 'hi~', 'bye~']}/> */}
    {/* <LoginControlRefactoring /> */}
    {/* <MainPage /> */}
    {/* <LandingPage /> */}
    {/* <Numberlist /> */}
    {/* <ListKey /> */}
    {/* <AttendanceBook /> */}
    <NameForm />

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