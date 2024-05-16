import { createGlobalStyle } from "styled-components";
import reset, { Reset } from "styled-components";
import TodoTemplate from "./Components/TodoTemplate";
import TodoInsert from "./Components/TodoInsert";
import TodoList from "./Components/TodoList";
import React, { useRef, useState } from "react";

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
    // id, 내용, 완료 여부
    // TodoList에 props로 전달
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

    // 새 객체를 만들 때마다 id값에 1씩 더해줘야 하는데
    // id 값은 렌더링되는 정보가 아님
    // 단순히 새로운 항목을 만들 때 참조되는 값이다.
    // useRef()를 사용하여 변수 생성
    const nextId = useRef(4);
    console.log(nextId);

    // todos 배열에 새 할일 객체를 추가하기 위한 함수
    const handleInsert = (text) => {
      const todo = {
        id: nextId.current,
        text,
        done: false
      };

      // 방법1
      const copyTodos = [...todos];
      copyTodos.push(todo);
      settodos(copyTodos); // 새로운 배열을 만들어 넣어줌

      // (편법)
      // settodos([...todos, todo]);

      // 방법2 - 배열의 내장 함수 이용
      settodos(todos.concat(todos));

      nextId.current += 1; // nextId에 1씩 더하기
    };

    // todos 배열에서 id값으로 항목을 지우기 위한 함수
    const handleRemove = (id) => {
      // 방법1 - error
      // const Copyaaa = [...todos];
      // const targetIndex = todos.findIndex(todo => todo.id === id);
      // Copyaaa.splice(targetIndex,1);
      // settodos(Copyaaa);

      // 방법2 - 배열의 내장 함수 이용
      settodos(todos.filter(todo => todo.id !== id));
    };

    // todos 배열의 특정 요소를 수정하기 위한 함수
    const handleToggle = (id) => {
      // 방법1
      // const copyTodos = [...todos];
      // const targetIndex = todos.findIndex((todo) => { return todo.id === id });
      // copyTodos[targetIndex].done = !copyTodos[targetIndex].done;
      // settodos(copyTodos);

      // 방법2 - 배열의 내장 함수
      settodos(todos.map((todo) => {
        return todo.id === id ? { ...todo, done: !todo.done } : todo;
      }));

    };

  return (
    <>
      {/* 둘 중에 하나 실행 */}
      {/* <Reset />  */}
      <GlobalStyle />
      <TodoTemplate>
      <TodoInsert onInsert={handleInsert}/>
        <TodoList todos={todos} onRemove={handleRemove} onToggle = {handleToggle}/>
      </TodoTemplate>
    </>
  );
}

export default App;
