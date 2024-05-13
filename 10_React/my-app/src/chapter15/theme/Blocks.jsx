import styled from "styled-components";

const Wrapper =  styled.div`
  display: flex;
  padding: 1rem;
  background-color: lightgray;
`;

const Block = styled.div`
  padding: ${props => props.padding};
  border: 1px solid black;
  border-radius: 1rem;
  background-color: ${props => props.backgroundColor};
  color: white;
  font-weight: bold;
  text-align: center;
`;

const blackItem = [
  {
    label: '1',
    padding: '1rem',
    backgroundColor: 'red' 
  },
  {
    label: '2',
    padding: '3rem',
    backgroundColor: 'green' 
  },
  {
    label: '3',
    padding: '2rem',
    backgroundColor: 'blue' 
  }
];

function Blocks() {
  return (
    <Wrapper>
      {/* Quiz: 배열 반복 랜더링 및 스타일링 완성 */}
      {blackItem.map((blackItem) => {
        
        return (
          <Block 
          key = {blackItem.label} 
          padding = {blackItem.padding} 
          backgroundColor={blackItem.backgroundColor}>
            {blackItem.label}
          </Block>
        );
      })}
    </Wrapper>
  );
};

export default Blocks;