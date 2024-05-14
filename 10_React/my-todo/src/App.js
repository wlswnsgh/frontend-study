import { createGlobalStyle } from "styled-components";
import reset, { Reset } from "styled-react";
import TodoTemplate from "./Components/TodoTemplate";
import TodoInsert from "./Components/TodoInsert";
import TodoList from "./Components/TodoList";
import React, { useState } from "react";

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
    // todos 배열 안에 객체 형태로 데이터가 존재
    const [todos, settodos] = useState([
      {
        id: 1,
        text: '수업 교안 작성하기',
        done: true
      },
      {
        id: 2,
        text: '시험 체점하기',
        done: true
      },
      {
        id: 3,
        text: '단계별 실습 예제 만들기',
        done: false
      }
    ]);
  return (
    <>
    
      {/* <Reset /> 둘 중에 하나 실행 */}
      <GlobalStyle />
      <TodoTemplate>
      <TodoInsert />
        <TodoList todos={todos} />
      </TodoTemplate>
    </>
  );
}

export default App;
