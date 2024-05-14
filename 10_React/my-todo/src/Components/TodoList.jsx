import styled from "styled-components";
import TodoListItem from "./TodoListItem";

const TodoListWrapper = styled.div`
  min-height: 320px;
  max-height: 513px; // 57px * 9개 항목
  overflow-y: auto;
`;
// todos 배열을 props를 받아와서 map() 함수를 사용해 여러 개의 TodoListItem  컴포넌트로 변환해 보여줌

// 이렇게 받아올 수도 있다.
// function TodoList({props})

function TodoList(props) {
  const { todos } = props;

  return (
    <TodoListWrapper>
      {/* <TodoListItem/>
      <TodoListItem/>
      <TodoListItem/> */}

      {todos.map((todo, index) => {
        return <TodoListItem key={todo.id} todo={todo} />;
      })}

      {/* 문제풀이 */}
      {[
        <TodoListItem 
        key={1} 
          todo={{
          id: 1,
          text: '수업 교안 작성하기',
          done: true
        }}/>, 
        <TodoListItem 
        key={2}
          todo={{
            id: 2,
            text: '시험 체점하기',
            done: true
        }}
        />, 
        <TodoListItem 
        key={3}
        todo={{ 
          id: 3,
          text: '단계별 실습 예제 만들기',
          done: false
      }}
        />
      ]}
    </TodoListWrapper>
  );
};

export default TodoList;