import { useState } from "react";
import UnitCounter from "./UnitCounter";
import UnitInput from "./UnitInput";

function UnitCalculator() {
  // Shared State 실습
  const [length, setLenth] = useState(1);
  const handleChange = (e) => {
    setLenth(Number(e.target.value));
  };

  return (
    <>
    <p>단위 변환 계산기</p>
    <hr />
    <label>
      <input type="number" value={length} onChange={handleChange} min={0}/>
      미터(m)
    </label>
    <hr />
    <UnitCounter length={length} onLengthChange={setLenth}/>
    <br />
    <UnitInput unit="mm" length={length}/>
    <br />
    <UnitInput unit="cm" length={length}/>
    <br />
    <UnitInput unit="m" length={length}/>
    <br />
    <UnitInput unit="km" length={length}/>
    <br />
    <UnitInput unit="inch" length={length}/>
    <br />
    <UnitCounter length={length} onLengthChange={setLenth}/>
    </>
  );
};

export default UnitCalculator;