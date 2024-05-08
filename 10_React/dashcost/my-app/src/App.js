import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import PostDetail from './components/PostDetail';

function App() {
  // 서버에서 가져온 데이터라고 가정하자.
  const [posts, setposts] = useState(['리액트 잘 쓰려면?', '자바스크립트 핵심 문법', 'css 스타일링 가이트']);

  const [showPostDetail, setshowPostDetail] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(null);
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
          </div>
          );
        
        })}

        {/* <p>{showPostDetail ? <PostDetail /> : null }</p>
        <button type='button' onClick={handleClick}>누르면 나와요^^</button> */}

        {/* 포스트 상세보기 */}
        {/* Quiz: 조건부 랜더링 */}
        {showPostDetail &&  <PostDetail posts = {posts} currentIndex={currentIndex}/>}
        
      </div>
    </>
  );
}

export default App;
