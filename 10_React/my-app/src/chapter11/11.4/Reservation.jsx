import React, { useState } from "react";
function Reservation() {
  // 여러 개의 입력 제어하기 => 여러 개의 state 선언
  const [breakfast, Setbreakfast] = useState(false);
  const [numberOfGuests, SetnumberOfGuests] = useState(10);
  const [roomType, setroomType] = useState('SINGLE');
  
  const handleBreakfastChange = (e) => {
    Setbreakfast(e.target.checked);
  };

  const handleNumber = (e) => {
    SetnumberOfGuests(e.target.value);
  };

  const handleRoomChange = (e) => {
    setroomType(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`조식 여부: ${breakfast}, 투숙객 수: ${numberOfGuests}, 
    룸 타입: ${roomType}`);
  };

  return (

    <form onSubmit={handleSubmit}>
      조식 여부:
      <label>
        <input 
          type="checkbox"
          // checked 속성은 checkbox랑 radio 타입에 존재하고
          // boolean 타입의 값
          checked = {breakfast} 
          onChange= {handleBreakfastChange}
        />
      </label>

      <br />

      투숙객 수:
      <label>
        <input 
          type="number" 
          value = {numberOfGuests}
          onChange={handleNumber}
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
          onClick={handleRoomChange}
        />
      </label>

      <label>
        더블
        <input 
          type="radio"
          name="roomType"
          value="DOUBLE" 
          checked = {roomType === 'DOUBLE'}
          onClick={handleRoomChange}
        />
      </label>

      <label>
        트윈
        <input 
          type="radio"
          name="roomType"
          value="TWIN" 
          checked = {roomType === 'TWIN'}
          onClick={handleRoomChange}
        />
      </label>

      <button type="submit">제출</button>
    </form>
  );
};

export default Reservation;