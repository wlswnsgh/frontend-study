import styled from "styled-components"

const TodoListItemWrapper = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
`;

const Text = styled.div`
  margin-right: 0.5rem;
  flex: 1;
`;

const Remove = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
`;

const Edit = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #ff6b6b;
  cursor: pointer;
  margin-right: 10px;
`;

function TodoListItemCopy() {
  return (
  <TodoListItemWrapper>
    <Checkbox></Checkbox>
    <Text></Text>
    <Edit></Edit>
    <Remove></Remove>
  </TodoListItemWrapper>
  );
};

export default TodoListItemCopy;