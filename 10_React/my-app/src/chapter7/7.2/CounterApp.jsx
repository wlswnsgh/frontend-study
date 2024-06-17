import React, { useState, useEffect } from 'react';

const CounterApp = () => {
  const [count, setCount] = useState(0);

  // 현재 렌더링한 상태를 다룬다.
  const increment = () => {
    console.log(count);
    setCount(count + 1);
  };

  // useEffect는 랜더링 이후에 상태를 다룬다 값이 초기화가 안됨.
  // 의존성 배열은 어떤 상태나 변수가 바뀔 때마다 실행한다는 뜻이다.
  useEffect(() => { 
    console.log(count);
    document.title = `You clicked ${count} times`;
  }, [count]); // []: 마운트에 count라는 의존성 배열을 넣어 count가 동작이 된 후 실행할 수 있다.

  return (

    <div>
      <h1>Counter: {count}</h1>
      <button onClick={increment}>Increment</button>
    </div>

  );
};

export default CounterApp;