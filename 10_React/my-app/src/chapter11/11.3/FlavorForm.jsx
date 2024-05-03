import React, { useState } from "react";

function FlavorForm() {
  const [Value, setValue] = useState('cocount');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    alert('가장 좋아하는 맛: ' + Value);
    e.preventDefault();
  }

  return (
    <form>
      <label onSubmit={handleSubmit}>
        좋아하는 맛 선택:
        <select value={Value} onChange={handleChange}>
          <option value="grapefruit">자몽</option>
          <option value="lime">라임</option>
          <option value="cocount" selected>코코넛</option>
          <option value="mango">망고</option>
        </select>

        {/* HTML DOM */}
        {/* <select>
          <option value="grapefruit">자몽</option>
          <option value="lime">라임</option>
          <option value="cocount" selected>코코넛</option>
          <option value="mango">망고</option>
        </select> */}
      </label>
      <button type="submit">제출</button>
    </form>
  );
};

export default FlavorForm;