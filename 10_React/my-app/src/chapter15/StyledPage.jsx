import styled, { css } from "styled-components";
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

  /* 6. 반응형 디자인 
  - 일반 css를 사용할 때와 똑같이 미디어 쿼리 사용 가능
  - 리액트스럽게 react-responsive 라이브러리 사용 <- 권장!!
  */
  /* 기본적으로 가로 길이를 1024byte에 가운데 정렬하고
    가로 크기가 작아짐에 따라 크기를 줄이고 768px 미만이 되면 꽉 채우기 */
    width: 1024px;
    margin: 0 auto;
    @media screen and (max-width: 1024px) {
      width: 768px;
    }
    @media screen and (max-width: 768px) {
      width: 100%;
    }
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

  /* 버튼 사이 간견 띄우기 */
  & + & {
    margin-left: 1rem;
  }


  /* 4. 여러 줄의 스타일 구문을 조건부로 설정해야 하는 경우 css을 불러와 사용 */
  ${props => props.$Inverted && 
    css`
      background: white;
      color: #1f1f1f;
      border: 2px solid white;
      &:hover {
        background: #1f1f1f;
        color: white;
      }
    `
  }


`;

  // 스타일 확장(커스텀) 하기
  // Button 컴포넌트에 모서리를 둥글게하는 스타일이 추가된 컴포넌트
  const RoundedButton = styled(Button) `
    border-radius: 16px;
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

      <Button $Inverted>Inverted</Button>

      <RoundedButton>Rounded</RoundedButton>


    </Wrapper>
  );
}

export default StyledPage;