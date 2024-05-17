import React, { useState } from "react";
import TimerContainer from "./TimerContainer";

function Timer() {
  const [showTime, SetshowTime] = useState(false);

  return (
    <>
      {!showTime ? <TimerContainer /> : null}
      <br />
      <button type="button" onClick={() => SetshowTime(!showTime)}> On/Off 토글</button>
    </>
  );
};

export default Timer;