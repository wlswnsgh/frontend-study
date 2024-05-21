import React, { useState } from "react";
import styled from "styled-components";

const TodoInsertWrapper = styled.form` 
  display: flex; 
  background: #495057;
`;

const StyledInput = styled.input` 
  background: none;
  outline: none;
  border: none;
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.5;
  color: white;
  flex: 1;
`;

const StyledButton = styled.button`
  border: none;
  background: #868e96;
  color: white;
  padding: 0 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
`;


function TodoInsertCopy() {

  return (
    <TodoInsertWrapper>
      <StyledInput 
        type="text"
        placeholder="할일을 입력하세요"
      />
      <StyledButton>버튼</StyledButton>
    </TodoInsertWrapper>
  );
};

export default TodoInsertCopy;