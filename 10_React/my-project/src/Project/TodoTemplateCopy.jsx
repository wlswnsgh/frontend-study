import styled, { css } from "styled-components"

const TodoTemplateWrapper = styled.div`
  width: 512px;
  margin: 6rem auto 0;
  border-radius: 4px;
  overflow: hidden;
  
  .app-title {
    background: #22b8cf;
    color: white;
    height: 1.5rem;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .content {
    background: white;
  }
`;


function TodoTemplateCopy({ children }) {

  return (
    <TodoTemplateCopy>
      <div className="app-title">일정관리</div>
      <div className="content">{children}</div>
    </TodoTemplateCopy>
  );
};

export default TodoTemplateCopy;