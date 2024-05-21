import logo from './logo.svg';
import './App.css';
import Button from './components/ui/Button';
import TextInput from './components/ui/TextInput';
import MainPage from './components/page/MainPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import PostViewPage from './components/page/PostView';
import PostWritePage from './components/page/PostWritePage';

const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

function App() {
  return (
    <BrowserRouter>
      <MainTitleText>미니 블로그</MainTitleText>
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/post-write' element = {<PostWritePage />}/>
        <Route path='/post/:postId' element={<PostViewPage />} />
            {/* 여기서 :postId는 동적으로 변하는 파라미터를 위한 값 => URL 파라미터 */}
            {/* 경로에 콜론(:)을 쓰고 파라미터명을 입력하면 연결된 컴포넌트에서 useParams() 훅을 사용해 postId 이름으로 해당 값을 가져올 수 있음*/}


            {/* (참고) */}
            {/* URL 파라미터를 여러개 쓰고 싶다면? */}
            {/* <Route path='/post/:postId/:otherValue' element={<PostViewPage />} /> */}

            {/* 필수가 아닌 옵션값으로 처리하고 싶다면? Optional Segments */}
            {/* <Route path='/post/:postId/:otherValue?' element={<PostViewPage />} /> */}


      </Routes>
    </BrowserRouter>
  );
}

export default App;
