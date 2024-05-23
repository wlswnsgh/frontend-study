import styled from "styled-components";

const TodoTemplateWrapper = styled.div`
  background: #e9ecef;
  width: 400px;
  margin: 8rem 20rem 0;
  overflow: hidden;

  .chat-app {
    background: #cccccc;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 4rem;
    font-size: 1.5rem;
    border-radius: 10px;
  }

  .chatting1 {
    background: white;
    min-height: 450px;
    max-height: 530px;
    overflow-y: auto;
    border-radius: 10px;
    display: flex;
    margin-bottom: 15px;
  }
`;

function ChattingIn(props) {
  const { chat } = props;

  return (
    <> 

      <TodoTemplateWrapper>
        <div className='chat-app'>Chat App</div>
        <div className='chatting1'></div>
      </TodoTemplateWrapper>
    </>
  );
};

export default ChattingIn;