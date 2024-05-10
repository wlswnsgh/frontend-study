import styled from "styled-components";
// 0. styled-components 설치하기
// npm install styled-components

// CSS in JS란?
// JS 안에 CSS를 작성하는 것

// styled-components란?
// CSS 문법을 그대로 사용하면서 결과물로 스타일링된 컴포넌트를 만들어주는 라이브러리
// 컴포넌트 개념을 사용하기 때문에 리액트의 궁합이 잘 맞음
// 백틱을 사용하여 구성 요소의 스타일을 지정

// 다양한 문법은 공식 문서 참고
// https://styled-components.com/docs
// vscode-styled-components 익스텐션 설치하기

// 1. 기본적인 사용법
const Wrapper = styled.div`
  padding: 1rem;
  background: gray;
`;

// 2. props 사용하기
// 컴포넌트 형태라 props 사용이 가능(최고 장점 중 하나)
const Button = styled.button`
  width: ${(props) => props.width || '100px'};
  height: ${(props) => props.height || '40px'};
  background: ${props => props.$dark ? 'black' : 'white'};
  color: ${props => props.$dark ? 'white' : 'black'};
  border: 2px solid black;
  cursor: pointer;

  /* 3. &(parent selector)를 사용하여 바깥쪽 선택자 참조 가능(like Sass) */
  /* 여기서는 Button 자기 자신을 참조 */
  &:hover {
    background: #b3b3b3;
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  color: white;
  text-align: center;
`;

function StyledPage() {
  return (
    <Wrapper>
      <Title>안녕, 리액션!</Title>
      <Button width="200px" height="60px" $White>버튼</Button>

      {/* dark라는 속성을 주면 버튼이 동작이된다 */}
      {/* $는 스타일 지정만을 위한 prop이 DOM 요소로 렌더링되는 것을 방지하기 위해
      붙여 임시 props로 전환된다. */}
      {/* dark속성을 넣을 때 $를 꼭 넣어야 log를 찍을 때 경고창이 뜨지 않는다. */}
      <Button $dark>Dark</Button> 
    </Wrapper>
  );
}

export default StyledPage;