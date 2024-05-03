import React, { useState } from "react";

// 개선한 코드
function ReservationRefactoring() {
  // 만약 여러 개의 state가 서로 관련이 있는 데이터라면 객체 형태로 묶어서 관리 가능
  // input에 name 속성을 설정하고 이벤트가 발생했을 때 이 값을 참조하여 객체에 접근
  // 물론 관련이 없는 데이터라면 여러 개의 state로 선언해서 사용

  // 한 개로 제어하기 
  const [Input, setInput] = useState({
    breakfast: false,
    numberOfGuests: 2,
    roomType: 'SINGLE'
  });
  const {breakfast, numberOfGuests, roomType } = Input; // 구조 분해 할당을 통해 값 추출

  const handlesetInputChange = (e) => {
    console.log(e.target); // 현재 이벤트가 발생한 대상 객체

    const { type, name, checked, value} = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    console.log(name, inputValue);
    
    // 중요!
    // 리액트 상태에서 객체를 수정해야 할 때에는,
    // 아래와 같이 기존 상태를 직접 수정해서 set함수에 넣으면 안됨.
    // inputs[name] = inputValue;
    // setInput(inputs);
    // => inputs가 가리키는 객체의 내부 데이터만 바뀐것이지 주소값(참조값)은 변하지 않았기 때문에
    // 그 대신 새로운 객체를 만들어서 변화를 주고 이를 상태로 사용해야함.
    // 이러한 작업을 "불변성을 지킨다."라고 부름(기존 객체는 변경하지 X)
    // 불변성을 지켜주어야 리액트 컴포넌트에서 상태가 업데이트 됐음을 감지할 수 있고 이에 따라 재렌더링이 진행됨
    // 방법1: 차근차근 방법
    // const copyInputs = {
    //   ...Input
    // };
    // copyInputs[name] = inputValue;
    // setInput(copyInputs);

    // 방법2: 코드 단축 버전
    setInput({
      ...Input,
      [name]: inputValue
    });

    // 결론: 리액트 상태에서 객체를 업데이트 할 때에는 기존 객체를 직접 수정하면 안되고,
    // 새로운 객체(기존 객체의 본사본)를 만들고 그 객체에 변화를 주고 마지막에 set함수에 넣어줘야 한다.

  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`조식 여부: ${breakfast}, 투숙객 수: ${numberOfGuests}, 
    룸 타입: ${roomType}`);
  };

  // 여러 입력 양식을 제어해야할 때, 각 엘리먼트에 name 속성을 추가하고 
  // even.target.name 값을 통해 어떤 입력 양식인지 구분할 수 있게 해줌
  // 그리고 useState에서는 기본 타입의 값이 아니라 객체 형태의 상태를 관리
  return (

    <form onSubmit={handleSubmit}>
      조식 여부:
      <label>
        <input 
          type="checkbox"
          name= "breakfast" // name 속성 추가
          // checked 속성은 checkbox랑 radio 타입에 존재하고
          // boolean 타입의 값
          checked = {breakfast} 
          onChange= {handlesetInputChange}
        />
      </label>

      <br />

      투숙객 수:
      <label>
        <input 
          type="number" 
          value = {numberOfGuests}
          onChange={handlesetInputChange}
        />
      </label>

      <br />

      룸 타입:
      <label>
        싱글
        <input 
          type="radio"
          name="roomType"
          value="SINGLE" 
          checked = {roomType === 'SINGLE'}
          onChange={handlesetInputChange}
        />
      </label>

      <label>
        더블
        <input 
          type="radio"
          name="roomType"
          value="DOUBLE" 
          checked = {roomType === 'DOUBLE'}
          onChange={handlesetInputChange}
        />
      </label>

      <label>
        트윈
        <input 
          type="radio"
          name="roomType"
          value="TWIN" 
          checked = {roomType === 'TWIN'}
          onChange={handlesetInputChange}
        />
      </label>

      <button type="submit">제출</button>
    </form>
  );
};

export default ReservationRefactoring;