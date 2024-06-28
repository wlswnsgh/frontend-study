import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MapWrap = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
`;

const CategoryList = styled.ul`
  position: absolute;
  top: 10px;
  left: 10px;
  border-radius: 5px;
  border: 1px solid #909090;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.4);
  background: #fff;
  overflow: hidden;
  z-index: 2;
  list-style: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  float: left;
  width: 50px;
  border-right: 1px solid #acacac;
  padding: 6px 0;
  text-align: center;
  cursor: pointer;
  ${({ active }) =>
    active &&
    `
    background: #eee;
  `}
  &:hover {
    background: #ffe6e6;
    border-left: 1px solid #acacac;
    margin-left: -1px;
  }
  &:last-child {
    margin-right: 0;
    border-right: 0;
  }
`;


function Map(){
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [currCategory, setCurrCategory] = useState('');

  useEffect(() => {
    const script = document.createElement('script'); // 자바스크립트로 명령어 구현
    script.async = true;  // 스크립트 파일을 비동기적으로 처리한다는 의미이다. 즉시 실행
    script.src = '//dapi.kakao.com/v2/maps/sdk.js?appkey=8eb4e510757118f8218df5b91c7413bf&libraries&libraries=services'; // API 서버 구현
    document.head.appendChild(script); // head는 html head를 의미, appendChild(script) script를 가져옴

    script.onload = () => { // .onload는 어떤 파일를 실행시킬 때 사용하는 명령어
       // window.kakao.maps명령어는 카카오 Map이라는 API에 접근할 수 있다.
       // window,kakao.maps.load()는 Kakao Maps API를 로드하고 초기화하는 과정이며 예를 들어 좌표를 가져올 때 사용된다.
      window.kakao.maps.load(() => {
        const mapOptions = {
          center: new window.kakao.maps.LatLng(37.4522, 126.6997), // 좌표를 불러오는 명령어
          level: 5 
        };

        const kakaoMap = new window.kakao.maps.Map(document.getElementById('root'), mapOptions); // index.html에 있는 <script>를 root라는 id를 통해서 가져온다는 의미이다.

        setMap(kakaoMap); // setMap()함수를 이용해 kakaoMap 화면에 구현
      });
    };

    return () => {
      document.head.removeChild(script); // .removeChild 특정 요소를 제거 즉 head에 있는 script를 제거
    };
  }, []);

  const onClickCategory = (e) => {
    const id = e.target.id;
    if (!id || currCategory === id) {
      setCurrCategory('');
      changeCategoryClass(null);
      removeMarker();
    } else {
      setCurrCategory(id);
      changeCategoryClass(id);
      searchPlaces(id);
    }
  };

  const searchPlaces = (category) => {
    if (!category) return;
    // 지도맵에서 장소를 특정하는 걸 말한다. 
    // new는 객체를 생성한다는 뜻이다.
    const ps = new window.kakao.maps.services.Places(map); 
    ps.categorySearch(category, placesSearchCB, { useMapBounds: true });
  };

  const displayPlaces = (places) => {
    removeMarker();

    for (let i = 0; i < places.length; i++) {
      const marker = addMarker(new window.kakao.maps.LatLng(places[i].y, places[i].x));
      markers.push(marker);
    }
  };

  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      console.log('검색 결과가 없습니다.');
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      console.error('검색 중 오류가 발생했습니다.');
    }
  };

  // 지도상의 특정위치를 표시함수 생성
  const addMarker = (position) => {
    const marker = new window.kakao.maps.Marker({ // 지도상의 특정위치를 표시할 수 있다.
      position: position // position는 위도 경도 값을 내기 위해 사용한다.
    });
    marker.setMap(map);  // maker를 setmat함수에 map저장
    return marker; // marker를 리턴해서 값을 살려준다.
  };

  // 마커숨김
  const removeMarker = () => {
    markers.forEach(marker => marker.setMap(null)); // 마커를 숨길려고 쓰는 명령어이다.
    setMarkers([]);
  };

  const changeCategoryClass = (id) => {
    const category = document.getElementById('category');
    const children = category.children;
    for (let i = 0; i < children.length; i++) {
      children[i].classList.remove('on');
    }
    if (id) {
      document.getElementById(id).classList.add('on');
    }
  };

  useEffect(() => {
    if (!map) return;

    const category = document.getElementById('root');
    const children = category.children;

    for (let i = 0; i < children.length; i++) {
      children[i].addEventListener('click', onClickCategory);
    }

    return () => {
      for (let i = 0; i < children.length; i++) {
        children[i].removeEventListener('click', onClickCategory);
      }
    };
  }, [map]);

  return (
    <MapWrap>
      <div id="map" style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}></div>
      
      <CategoryList id="category">
        <CategoryItem id="BK9" className={currCategory === 'BK9' ? 'on' : ''} active={currCategory === 'BK9'}>
          <span className="category_bg bank"></span>
          은행
        </CategoryItem>

        
        <CategoryItem id="MT1" className={currCategory === 'MT1' ? 'on' : ''} active={currCategory === 'MT1'}>
          <span className="category_bg mart"></span>
          마트
        </CategoryItem>

        <CategoryItem id="PM9" className={currCategory === 'PM9' ? 'on' : ''} active={currCategory === 'PM9'}>
          <span className="category_bg pharmacy"></span>
          약국
        </CategoryItem>
        
        <CategoryItem id="OL7" className={currCategory === 'OL7' ? 'on' : ''} active={currCategory === 'OL7'}>
          <span className="category_bg oil"></span>
          주유소
        </CategoryItem>
        <CategoryItem id="CE7" className={currCategory === 'CE7' ? 'on' : ''} active={currCategory === 'CE7'}>
          <span className="category_bg cafe"></span>
          카페
        </CategoryItem>
        <CategoryItem id="CS2" className={currCategory === 'CS2' ? 'on' : ''} active={currCategory === 'CS2'}>
          <span className="category_bg store"></span>
          편의점
        </CategoryItem>
      </CategoryList>
    </MapWrap>
  );
};

export default Map;
