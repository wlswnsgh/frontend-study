import EX from "./Ex";
import Footer from "./Footer";
import Header from "./Header";
import Layout from "./Layout";
import Profile from "./Profile";

function PropUse() {
  return (
    <>
      <
        Profile intrduction = '1,000000' name = 'jin' viewCount = {20}
         // 키-값 쌍의 형태로 자식 컴포넌트에 props를 전달할 수 있음
        // 정수, 변수, 다른 컴포넌트 등 값을 넣을 때는 {} 사용
        // 문자열은 {} 생략 가능
        // Quiz
        // name(문자), intrduction(문자), viewCount(숫자)
      />
      <Profile intrduction = '2,000000' name = 'jun' viewCount = {23}/>
      <Profile intrduction = '3,000000' name = 'ho' viewCount = {25} />
      <Layout
      width = {2500}
      height = {1440}
      // props로 다른 컴포넌트를 넘기는 것도 가능
      header = {<Header title = 'hello world'/>}
      footer = {<Footer />}
      />

      <EX props = {10}/>
    </>
  );
}


export default PropUse;
