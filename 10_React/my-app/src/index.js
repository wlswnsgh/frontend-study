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
import EssayForm from './chapter11/11.3/EssayForm';
import FlavorForm from './chapter11/11.3/FlavorForm';
import Reservation from './chapter11/11.4/Reservation';
import ReservationRefactoring from './chapter11/11.4/ReservationRefactoring';
import Signup from './chapter11/11.5/Signup';
import TextInputWithFocusButton from './chapter7/7.6/TextInputWithFocusButton';
import FileInput from './chapter11/11.3/FileInput';
import UnitCounter from './chapter12/UnitCounter';
import UnitCalculator from './chapter12/UnitCalculator';
import UnitInput from './chapter12/UnitInput';
import FancyBorder from './chapter13/13.1.1.1/FancyBorder';
import WelcomeDialog from './chapter13/13.1.1.1/WelcomeDialog';
import SplitPaneSection from './chapter13/13.1.1.2/SplitPaneSection2';
import DialogContainer from './chapter13/13.1.2/DialogContainer';
import SignUpDialog from './chapter13/13.1.3/SignUpDialog';
import ProfileCard from './chapter13/13.3.3/ProfileCard';
import Card from './chapter13/13.3.3/Card';
import StyledPage from './chapter15/StyledPage';
import Blocks from './chapter15/theme/Blocks';
import ComponentVariable from './chapter7/7.6/ComponentVariable';
import CounterEffect from './chapter7/7.3/ex1/CounterEffect';
import Timer from './chapter7/7.3/ex2/Timer';
import EffectSummary from './chapter7/7.3/ex3/EffectSummary';
import EffectContainer from './chapter7/7.3/ex3/EffectContainer';
import SimpleRouter from './chapter16/SimpleRouter';
import ApiRequest from './chapter17/ApiRequest';
import { Provider } from "react-redux";
import ReduxTestApp from './chapter18/ReduxTestApp';
import { store } from './chapter18/app/store';
import ProductList from './chapter18/product/ProductList';
import CounterApp from './chapter7/7.2/CounterApp';
import Car from './chapter19/Car';

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

    {/* 10. 예제 */}
    {/* <Numberlist /> */}
    {/* <ListKey /> */}
    {/* <AttendanceBook /> */}

    {/* 11. 예제 */}
    {/* <NameForm /> */}
    {/* <EssayForm /> */}
    {/* <FlavorForm /> */}
    {/* <Reservation /> */}
    {/* <ReservationRefactoring /> */}
    {/* <Signup /> */}

    {/* <TextInputWithFocusButton /> */}
    {/* <FileInput /> */}
    {/* <UnitCounter /> */}
    {/* <UnitCalculator /> */}
    {/* <WelcomeDialog /> */}
    {/* <SplitPaneSection /> */}
    {/* <DialogContainer /> */}
    {/* <ProfileCard /> */}
    {/* <StyledPage /> */}
    {/* <Blocks /> */}
    {/* <ComponentVariable /> */}
    {/* <CounterEffect /> */}
    {/* <CounterApp /> */}
    {/* <Timer /> */}
    {/* <EffectSummary /> */}
    {/* <EffectContainer /> */}
    {/* <SimpleRouter /> */}
    {/* <ApiRequest /> */}
    <Car />

    {/* 18장 예제 */}
    {/* 2. 리액트에 Redux Store 제공하기 (index.js) */}
    {/* ReduxTextApp 컴포넌트와 그 하위 자식들은 Redux Store에 접근 가능 */}

    {/* 저장된 state들을 마음대로 꺼내 쓸 수 있음 */}
    {/* <Provider store={store}>
        <ReduxTestApp />
    </Provider> */}
    
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