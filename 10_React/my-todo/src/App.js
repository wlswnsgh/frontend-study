import { createGlobalStyle } from "styled-components";
import reset, { Reset } from "styled-react";
import TodoTemplate from "./Components/TodoTemplate";
import TodoInsert from "./Components/TodoInsert";
import TodoList from "./Components/TodoList";

// 패키지 설치
// npm install styled-components styled-react style-icons

// 글로벌(공통) 스타일 적용과 reset css 적용
// createGlobalStyle을 이용하여 글로벌 스타일 컴포넌트를 만들고  가장 첫번째로 렌더링하면 된다.

const GlobalStyle = createGlobalStyle`
  /* reset css */
  /* ${reset} */
  
  /* 글로벌(공통) 스타일 */
  body {
    background: #e9ecef;
  }
`;

function App() {
  return (
    <>
    
      {/* <Reset /> 둘 중에 하나 실행 */}
      <GlobalStyle />
      <TodoTemplate>
      <TodoInsert />
        <TodoList />
      
      </TodoTemplate>
    </>
  );
}

export default App;
