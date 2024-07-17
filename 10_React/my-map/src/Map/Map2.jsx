import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

// 스타일드 컴포넌트로 UI 요소 스타일링
const Container = styled.div`
  margin: 30px;
  display: flex;
`;

const Sidebar = styled.div`
  width: 560px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-height: calc(108vh - 60px);
`;

const SidebarOverflow = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  height: 83vh;
  max-height: calc(108vh - 170px);
`;

const MenuBar = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-bottom: 20px;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  width: 100%;
  max-width: 500px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 9px;
  outline: none;

  &::placeholder {
    color: #bbb;
  }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const SearchResults = styled.div`
  position: absolute;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  top: 73.7%;
  
  &::-webkit-scrollbar {
    background: none;
  }
`;

const ResultItem = styled.div`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f9f9f9;
  }

  &.selected {
    background-color: #f9f9f9;
    font-weight: bold;
    color: #007bff;
  }
`;

const CategoryList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const CategoryItem = styled.li`
  display: inline-block;
  padding: 5px 10px;
  margin: 5px;
  font-size: 14px;
  background-color: ${(props) => (props.selected ? "#007bff" : "#f1f1f1")};
  color: ${(props) => (props.selected ? "white" : "black")};
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => (props.selected ? "#007bff" : "#ddd")};
    color: ${(props) => (props.selected ? "white" : "black")};
  }
`;

const SavedSearchItem = styled.div`
  background-color: white;
  margin-bottom: 5px;
  padding: 15px;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f9f9f9;
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

const PlaceName = styled.p`
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Address = styled.p`
  font-size: 13px;
  color: #555;
  margin-bottom: 5px;
`;

const Phone = styled.p`
  font-size: 13px;
  color: #555;
  margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  margin-left: 10px;
`;

// 지도 컴포넌트 정의
function Map() {
  // 상태 관리를 위한 useState 훅
  const [inputValue, setInputValue] = useState(""); // 검색 입력 값
  const [selectedCategories, setSelectedCategories] = useState([]); // 선택된 카테고리
  const [map, setMap] = useState(null); // Kakao Map 객체
  const [markers, setMarkers] = useState([]); // 마커 배열
  const [selectedPlace, setSelectedPlace] = useState(null); // 선택된 장소 상태
  const [searchResults, setSearchResults] = useState([]); // 검색 결과 상태
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1); // 선택된 항목 인덱스 상태
  const [savedSearches, setSavedSearches] = useState([]); // 저장된 검색 상태
  const [categoryPlaces, setCategoryPlaces] = useState([]); // 카테고리 장소 상태

  // Kakao 지도 InfoWindow와 관련된 useRef 훅
  const infoWindow = useRef(null);
  const timerRef = useRef(null); // 검색 디바운스 타이머 useRef
  const searchResultsRef = useRef(null); // 검색 결과 useRef
  const customOverlayRef = useRef(null); // 커스텀 오버레이 useRef

  // Kakao 지도 및 설정 초기화
  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.452268, 126.699650),
        level: 5,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap); // 지도 객체 설정
    };

    // Kakao 지도 API 스크립트 로드
    if (window.kakao && window.kakao.maps) {
      initMap();
    } else {
      const script = document.createElement("script");
      script.async = true;
      script.src =
       "//dapi.kakao.com/v2/maps/sdk.js?appkey=8eb4e510757118f8218df5b91c7413bf&libraries=services";
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  // 입력 값 변경 처리
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // 타이머 클리어
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 검색 입력 디바운스 처리
    timerRef.current = setTimeout(() => {
      if (value.trim() !== "") {
        const ps = new window.kakao.maps.services.Places(map);
        ps.keywordSearch(value, (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setSearchResults(data);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            setSearchResults([]);
            console.log("검색 결과 없음.");
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            console.error("검색 중 오류 발생.");
          }
        });
      } else {
        setSearchResults([]);
      }
    }, 300);
  };

  // 검색 결과에서 장소 선택 처리
  const handleSelectPlace = (place) => {
    markers.forEach((marker) => {
      marker.setMap(null); // 기존 마커 제거
    });

    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    window.kakao.maps.event.addListener(marker, "click", function () {
      displayPlaceInfo(marker, place);
    });

    setMarkers([marker]); // 새로운 마커 설정
    marker.setMap(map); // 지도에 마커 표시
    setSearchResults([]); // 검색 결과 초기화
    map.panTo(new window.kakao.maps.LatLng(place.y, place.x)); // 선택한 장소로 지도 이동
    setSelectedItemIndex(-1); // 선택된 항목 인덱스 초기화
    setSavedSearches([place]); // 저장된 검색 업데이트
    setInputValue(place.place_name); // 입력 값 업데이트
  };

  // 마커 클릭 시 장소 정보 표시
  const displayPlaceInfo = (marker, place) => {
    if (infoWindow.current) {
      infoWindow.current.close();
    }

    infoWindow.current = new window.kakao.maps.InfoWindow({
      content: `
        <div style="padding: 10px;">
          <PlaceName>${place.place_name}</PlaceName>
          <Address>${place.address_name}</Address>
          <Phone>${place.phone}</Phone>
        </div>
      `,
    });

    infoWindow.current.open(map, marker);
  };

  // 카테고리 선택 처리
  const handleCategorySelect = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((item) => item !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  // 선택된 카테고리에 따라 장소 필터링
  useEffect(() => {
    const ps = new window.kakao.maps.services.Places(map);
    let categoryFilter = "";
    if (selectedCategories.length > 0) {
      categoryFilter = selectedCategories.join(",");
    }
    ps.categorySearch(categoryFilter, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        setCategoryPlaces(data);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        setCategoryPlaces([]);
        console.log("검색 결과 없음.");
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        console.error("카테고리 검색 중 오류 발생.");
      }
    });
  }, [selectedCategories]);

  return (
    <Container>
      <Sidebar>
        <MenuBar>
          <SearchContainer>
            <Input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="장소 검색..."
            />
          </SearchContainer>

          {/* 검색 결과 표시 */}
          {searchResults.length > 0 && (
            <SearchResults ref={searchResultsRef}>
              {searchResults.map((result, index) => (
                <ResultItem
                  key={index}
                  className={index === selectedItemIndex ? "selected" : ""}
                  onClick={() => handleSelectPlace(result)}
                >
                  {result.place_name}
                </ResultItem>
              ))}
            </SearchResults>
          )}

          {/* 저장된 검색 표시 */}
          {savedSearches.length > 0 && (
            <SidebarOverflow>
              <SavedSearchItem>
                <PlaceName>{savedSearches[0].place_name}</PlaceName>
                <Address>{savedSearches[0].address_name}</Address>
                <Phone>{savedSearches[0].phone}</Phone>
                <ButtonContainer>
                  <StyledButton onClick={() => console.log("저장된 검색 버튼 클릭")}>
                    저장
                  </StyledButton>
                </ButtonContainer>
              </SavedSearchItem>
            </SidebarOverflow>
          )}

          {/* 카테고리 표시 */}
          <CategoryList>
            <CategoryItem
              selected={selectedCategories.includes("MT1")}
              onClick={() => handleCategorySelect("MT1")}
            >
              마트
            </CategoryItem>
            <CategoryItem
              selected={selectedCategories.includes("CE7")}
              onClick={() => handleCategorySelect("CE7")}
            >
              카페
            </CategoryItem>
            {/* 필요에 따라 추가 카테고리 추가 */}
          </CategoryList>
        </MenuBar>
      </Sidebar>

      {/* 지도 표시 */}
      <MapContainer id="map" />
    </Container>
  );
}

export default Map;
