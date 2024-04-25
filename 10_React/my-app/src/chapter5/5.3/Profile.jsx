function Profile(props) {
  return (
    <>
      <h1>사용자 프로필(조회수: {props.intrduction})</h1>
      <h2>이름 : {props.name}</h2>
      <h2>자기소개 : {props.viewCount}</h2>
    </>
  );
}

export default Profile;