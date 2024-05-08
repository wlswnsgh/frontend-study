import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import PostDetail from './components/PostDetail';

function App() {
  // 서버에서 가져온 데이터라고 가정하자.
  const [posts, setposts] = useState(['리액트 잘 쓰려면?', '자바스크립트 핵심 문법', 'css 스타일링 가이트']);
  const [showPostDetail, setshowPostDetail] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null); 
  const [likeCount, setLikeCount] = useState([0,0,0]);
  const [Inputs, setInputs] = useState(['']);


  // const handleClick = () => {
  //   setshowPostDetail(!showPostDetail);
  // };

  return (
    <>
      <header className="header--dark">
        <h4>Gonilog</h4>
        <nav>
          <ul>
            <li>트렌딩</li>
            <li>최신</li>
          </ul>
        </nav>
      </header>

      <div className="inner">
        {/* 포스트 목록
        <div className='list'>
          <h4>{posts[0]}</h4>
          <p>2023년 1월 20일</p>
          <p>by junho.jin</p>
        </div>

        <div className='list'>
          <h4>{posts[1]}</h4>
          <p>2023년 1월 20일</p>
          <p>by junho.jin</p>
        </div>

        <div className='list'>
          <h4>{posts[2]}</h4>
          <p>2023년 1월 20일</p>
          <p>by junho.jin</p>
        </div> */}

        {/* Quiz: map함수를 이용해서 posts 반복 랜더링을 해주어라 */}
        
        {/* 방법1 */}
        {posts.map((num, index) => {
          return (
          <div key={index} className='list'
            onClick={() => {
              setshowPostDetail(true);
              setCurrentIndex(index); // id값이 없으니 대신...
            }}
          >

            <h4>{num}</h4>
            <p>2023년 1월 20일</p>
            <p>by junho.jin</p>

            <hr />

            <div className='toolbar'> 
              <span onClick={(e) => {
                // (버그 수정) 현재는 좋아요 버튼 누를 때 글 상세보기까지 같이 클릭이 된다.
                // 부모-자식 관계에 있을 때 이벤트 버블링이 일어남
                e.stopPropagation(); // 상위 요소로 퍼지는 이벤트 버블링을 막음

                const copylikeCount = [...likeCount];
                copylikeCount[index]++;
                setLikeCount(copylikeCount);
              }}>🥇 {likeCount[index]}</span>

              {/* 포스트 삭제하기 */}
              {/* Quiz: 포스트마다 삭제 버튼 & 기능 만들기 */}
              <span style={{fontSize: 27}} onClick={(e) => {
                e.stopPropagation();
                // div 하나를 직접 제거 하는 것X
                // posts state에서 제거하면 알아서 자동으로 랜더링()
                // const copypost2 = [...posts];
                // copypost2.splice(index, 1);
                // setposts(copypost2);

                // 또는 배열의 filter() 함수 사용
                const filterPost = posts.filter((value, idx) => {
                  return index !== idx;
                });
                setposts(filterPost);

                // (버그 수정) 삭제 시 해당 포스트의 좋아요 카운트도 같이 삭제
                const copylikeCount = [...likeCount];
                copylikeCount.splice(index, 1);
                setLikeCount(copylikeCount);
              }}>🗑</span>
            </div>
          </div>
          );
        
        })}

        {/* <p>{showPostDetail ? <PostDetail /> : null }</p>
        <button type='button' onClick={handleClick}>누르면 나와요^^</button> */}

        {/* 포스트 등록하기 */}
        {/* input에 제목 입력 후 버튼 누르면 맨 앞에 새로운 포스트 추가 
          1) input을 제어 컴포넌트로 만들어서 사용자가 입력한 값을 state로 저장해서 관리
          2) 등록 버튼 클릭 시 posts 상태의 맨 앞에 새로운 데이터 추가
        */}

        <input type='text' value={Inputs} onChange={(e) => {
          setInputs(e.target.value);
        }}/>
        <button type='button' onClick={() => {
          setposts([Inputs, ...posts]);

          // (버그 수정) 포스트 하나 추가 시 좋아요 카운트도 같이 추가
          const copylikeCount = [0, ...likeCount];
          setLikeCount(copylikeCount);
        }}>포스트 등록</button>

        {/* 포스트 상세보기 */}
        {/* Quiz: 조건부 랜더링 */}
        {showPostDetail &&  <PostDetail posts = {posts} currentIndex={currentIndex} setposts={setposts}/>}

        
      </div>
    </>
  );
}

export default App;

// (참고) 왜 새로고침하면 다 없어질까?
// 새로고침 시 HTML/CSS/JS 파일을 다시 읽어와서 그럼
// 데이터를 유지하려면 서버에 보내서 DB에 영구 저장하고
// 새로고침 발생 시 DB에서 다시 읽어오면 됨
