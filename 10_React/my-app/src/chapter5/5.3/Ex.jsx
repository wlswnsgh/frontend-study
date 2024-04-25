function EX() {
  
  const weekArr = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  return (
    <>
      {weekArr.map((week, index) => (
        <span key={index}> {week} </span>
      ))}
    </>
  );

}

export default EX;