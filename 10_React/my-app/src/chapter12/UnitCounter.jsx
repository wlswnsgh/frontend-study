import React, { useState } from 'react';

function UnitCounter(props) {
  const { length, onLengthChange } = props;


  // Local State 실습
  // 컴포넌트마다 각각 개별적인 상태를 갖게 됨
  const [localLength, setLocalLength] = useState(1);


  return (
    <>
      {/* Local State */}
      {/* <button type='button' onClick={() => { 
        Math.max(setLocalLength(localLength-1),0); 
      }}>-</button>
      {localLength}
      <button type='button' onClick={() => { 
        setLocalLength(localLength+1); 
      }}>+</button> */}

      {/* Shared State */}
      <button type='button' onClick={() => { 
        Math.max(onLengthChange(length-1), 0); 
      }}>-</button>
      {length}
      <button type='button' onClick={() => { 
        onLengthChange(length+1); 
      }}>+</button>
      
    </>
  );
}

export default UnitCounter;