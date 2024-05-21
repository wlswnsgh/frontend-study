import styled from "styled-components";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  width: 25rem;
  background: #f1f1f1;
  box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.15);
  border-radius: 6px;
  overflow-y: auto;

  svg{
    cursor: pointer;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.75rem;
  }

  hr {
    margin: 0;
    border: 0.5px solid #ccc;
  }

  .body {
    padding: 1.25rem;
    font-size: 1rem;
    line-height: 1.125rem;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 10px 20px;
  }
`;


function ModalCopy() {
  const { title, children, onCloseModal, onEdit} = props;
  return (
    <>
    </>
  );
};

export default ModalCopy;