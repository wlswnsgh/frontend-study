// rfc
import React, {useState} from "react";

function EssayForm() {
  const [aaa, setaaa] = useState('안녕하세요');

  const handleChange = (e) => {
    setaaa(e.target.aaa);
  }
  

  const handleSubmit = (e) => {
    alert('제출된 에세이: ' + aaa);
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        에세이:
        <textarea value={aaa} onClick={handleChange}></textarea>
        {/* HTML DOM */}
        {/* <textarea>
          Hello world!
        </textarea> */}
        <button type="submit">제출</button>
      </label>
    </form>
  );
};

export default EssayForm;