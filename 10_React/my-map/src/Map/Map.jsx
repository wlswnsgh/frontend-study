import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px;
  position: relative;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 25px;
  padding: 5px 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  outline: none;

  &::placeholder {
    color: #bbb;
  }
`;

const Button = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const SearchIcon = styled.span`
  font-size: 20px;
  color: #007bff;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh; /* 수정: 더 작은 값으로 조정 */
`;

const CategoryList = styled.ul`
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
  background-color: #f1f1f1;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #ddd;
  }

  &.on {
    background-color: #007bff;
    color: white;
  }
`;

function Map(){
  const [inputValue, setInputValue] = useState("");
  const [currCategory, setCurrCategory] = useState('');
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [showInfo, setshowInfo] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById("map"); // 지도를 표시할 div 요소
      const options = {
        center: new window.kakao.maps.LatLng(37.452381, 126.699562), // 그린컴퓨터아카데미를 중심으로 초기화
        level: 5, // 지도의 확대 레벨
      };

      // 지도 생성 및 객체 리턴
      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap); // 상태에 지도 객체 저장
    };

    // Kakao 지도 API가 로드된 후 실행될 콜백 함수
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      // Kakao 지도 API 스크립트를 동적으로 로드
      const script = document.createElement("script");
      script.async = true;
      script.src ="//dapi.kakao.com/v2/maps/sdk.js?appkey=8eb4e510757118f8218df5b91c7413bf&libraries&libraries=services";
      script.onload = initMap; // 스크립트 로드 후 initMap 함수 실행
      document.head.appendChild(script);
    }
  }, []);

  // 태그 클릭 핸들러
  const onClickCategory = (e) => {
    const id = e.target.id; // 클릭된 id를 가져온다.
    if (!id || currCategory === id) {
      setCurrCategory(''); // 현재 카테고리를 초기화
      changeCategoryClass(null); // 카테고리의 클래스를 변경하여 선택 상태 헤제
      searchPlaces(id); // 마커 제거하지 않고 장소 검색만 수행
    } else {
      setCurrCategory(id); // 클릭된 요소의 id를 현재 카테고리로 설정
      changeCategoryClass(id); // 클릭된 카테고리에 대한 스타일을 변경하여 선택 상태를 나타낸다.
      searchPlaces(id);
    }
  };

  const searchPlaces = (query) => {
    if (!map || !query) return;
    const ps = new window.kakao.maps.services.Places(map);
    ps.keywordSearch(query, placesSearchCB);
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

  const displayPlaces = (places) => {
    removeMarker();
    for (let i = 0; i < places.length; i++) {
      const marker = addMarker(new window.kakao.maps.LatLng(places[i].y, places[i].x), places[i]);
      markers.push(marker);
    }
  };

  const addMarker = (position, placeInfo) => {
    const marker = new window.kakao.maps.Marker({
      position: position,
    });
    window.kakao.maps.event.addListener(marker, 'click', () => {
      displayPlaceInfo(marker, placeInfo);
    });
    marker.setMap(map);
    return marker;
  };

  const displayPlaceInfo = (marker, place) => {
    if (showInfo) {
      showInfo.close();
    }
    let content = '<div class="placeinfo">' +
      '   <a class="title" href="' + place.place_url + '" target="_blank" title="' + place.place_name + '">' + place.place_name + '</a>';
    if (place.road_address_name) {
      content += '    <span title="' + place.road_address_name + '">' + place.road_address_name + '</span>' +
        '  <span class="jibun" title="' + place.address_name + '">(지번 : ' + place.address_name + ')</span>';
    } else {
      content += '    <span title="' + place.address_name + '">' + place.address_name + '</span>';
    }
    content += '    <span class="tel">' + place.phone + '</span>' +
      '</div>' +
      '<div class="after"></div>';
    const infowindow = new window.kakao.maps.InfoWindow({
      content: content,
      position: marker.getPosition(),
    });
    infowindow.open(map, marker);
    setshowInfo(infowindow);
  };

  const removeMarker = () => {
    markers.forEach(marker => marker.setMap(null));
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

  const handleSearch = () => {
    if (!inputValue.trim()) {
      alert("검색어를 입력하세요."); // 검색어가 없는 경우 경고를 표시하도록 수정
      return;
    }
    searchPlaces(inputValue.trim()); // 입력된 검색어로 장소 검색을 실행
  };

  return (
    <Container>
      <SearchContainer>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
        <Button onClick={handleSearch}>
          <SearchIcon>🔍</SearchIcon>
        </Button>
      </SearchContainer>

      <CategoryList id="category">
        <CategoryItem id="BK9" className={currCategory === 'BK9' ? 'on' : ''}>
          <span className="category_bg bank"></span>
          은행
        </CategoryItem>
        <CategoryItem id="MT1" className={currCategory === 'MT1' ? 'on' : ''}>
          <span className="category_bg mart"></span>
          대형마트
        </CategoryItem>
        <CategoryItem id="HP8" className={currCategory === 'HP8' ? 'on' : ''}>
          <span className="category_bg pharmacy"></span>
          병원
        </CategoryItem>
        <CategoryItem id="CT1" className={currCategory === 'CT1' ? 'on' : ''}>
          <span className="category_bg oil"></span>
          문화시설
        </CategoryItem>
        <CategoryItem id="CE7" className={currCategory === 'CE7' ? 'on' : ''}>
          <span className="category_bg cafe"></span>
          카페
        </CategoryItem>
        <CategoryItem id="CS2" className={currCategory === 'CS2' ? 'on' : ''}>
          <span className="category_bg store"></span>
          편의점
        </CategoryItem>
        <CategoryItem id="FD6" className={currCategory === 'FD6' ? 'on' : ''}>
          <span className="category_bg store"></span>
          음식점
        </CategoryItem>
      </CategoryList>

      <MapContainer id="map">
        {/* 지도가 표시될 영역 */}
      </MapContainer>
    </Container>
  );
}

export default Map;
