import logo from './logo.svg';
import './App.css';
import Button from './components/ui/Button';
import TextInput from './components/ui/TextInput';
import MainPage from './components/page/MainPage';
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import PostViewPage from './components/page/PostView';

const MainTitleText = styled.p`
  font-size: 24px;
  font-weight: bold;
  text-align: center;
`;

function App() {
  const navigate = useNavigate();

  // URL 파라미터로 전달받은 postId값 가져오기
  // useParams(): URL 파라미터 경로에 입력된 값을 가져올 수 있다.
  console.log(useParams());
  const { postId } = useParams();
  return (
    <BrowserRouter>
      <MainTitleText>미니블로그</MainTitleText>
      <Routes>
        <Route path = '/' element = {<MainPage />} />
        <Route path='/post/:postId' element = {<PostViewPage />} />
        {/* 여기서 :postId는 동적으로 변하는 파라미터를 위한 값 => URL 파라미터 */}
        {/* 경로에 콜론(:)을 쓰고 파라미터명을 입력하면
          연결된 컴포넌트에서 useParams() 훅을 사용해 postId 이름으로 해당 값을 가져올 수 있음
        */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
