import styled from "styled-components"
import TodoListItemCopy from "./TodoListItemCopy";

const TodoListWrapper = styled.div`
  min-height: 320px;
  max-width: 513px;
  overflow-y: auto;
`;

function TodoListCopy({ todos, onRemove, onToggle, onModal}) {
  return (
    <TodoListWrapper>
      {todos.map((todo) => {
        return <TodoListItemCopy key={todo.id} todo={todo} onRemove = {onRemove} onToggle = {onToggle} onModal = {onModal} />
      })}
    </TodoListWrapper>
  );
};

export default TodoListCopy;