import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px;
  position: relative;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center; /* 수평 중앙 정렬 */
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 5px 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 15px;
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
  height: 50vh;
`;

const SearchResults = styled.div`
  position: absolute;
  width: 100%; /* 왼쪽과 오른쪽 padding 고려하여 너비 조정 */
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 9; /* 검색 결과 목록을 검색창 아래로 내리기 위해 z-index를 낮춤 */
  border-radius: 10px; /* 동그란 테두리 조정 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  top: 11%;
`;



const ResultItem = styled.div`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

function MapSearch() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const infoWindow = useRef();
  const timerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=8eb4e510757118f8218df5b91c7413bf&libraries=services";
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const container = document.getElementById("map");
    const options = {
      center: new window.kakao.maps.LatLng(37.452381, 126.699562),
      level: 5,
    };

    const kakaoMap = new window.kakao.maps.Map(container, options);
    setMap(kakaoMap);
  };

  useEffect(() => {
    if (selectedPlace && map) {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(selectedPlace.y, selectedPlace.x),
      });

      if (infoWindow.current) {
        infoWindow.current.close();
      }

      const newInfoWindow = new window.kakao.maps.InfoWindow({
        position: marker.getPosition(),
      });

      // Create custom content for info window
      const content = document.createElement("div");
      content.style.padding = "10px";
      content.style.width = "200px";
      content.innerHTML = `
        <div style="font-weight: bold; font-size: 16px; margin-bottom: 5px;">
          ${selectedPlace.place_name}
        </div>
        <div style="font-size: 14px;">
          ${selectedPlace.road_address_name || selectedPlace.address_name}
        </div>
      `;

      newInfoWindow.setContent(content);
      newInfoWindow.open(map, marker);

      infoWindow.current = newInfoWindow;

      marker.setMap(map);
      setMarkers([marker]);

      // Clear search results and input value
      setSearchResults([]);
      setInputValue("");
    }
  }, [selectedPlace, map]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // 입력이 있을 때마다 검색 결과를 가져오기 위해 타이머를 사용
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // 300ms 후에 검색 요청
    timerRef.current = setTimeout(() => {
      if (value.trim() !== "") {
        const ps = new window.kakao.maps.services.Places(map);
        ps.keywordSearch(value, (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setSearchResults(data);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            setSearchResults([]);
            console.log("검색 결과가 없습니다.");
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            console.error("검색 중 오류가 발생했습니다.");
          }
        });
      } else {
        setSearchResults([]);
      }
    }, 300);
  };

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
  };

  const handleSearch = () => {
    // 검색 버튼 클릭 시 검색 요청
    if (inputValue.trim() !== "" && map) {
      const ps = new window.kakao.maps.services.Places(map);
      ps.keywordSearch(inputValue, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
          setSearchResults(data);
        } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
          setSearchResults([]);
          console.log("검색 결과가 없습니다.");
        } else if (status === window.kakao.maps.services.Status.ERROR) {
          console.error("검색 중 오류가 발생했습니다.");
        }
      });
    } else {
      setSearchResults([]);
    }
  };

  return (
    <Container>
      <SearchContainer>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="장소를 검색하세요"
        />
        <Button onClick={handleSearch}>
          <SearchIcon>🔍</SearchIcon>
        </Button>
      </SearchContainer>
      
      {searchResults.length > 0 && (
        <SearchResults>
          {searchResults.map((place) => (
            <ResultItem key={place.id} onClick={() => handleSelectPlace(place)}>
              {place.place_name}
            </ResultItem>
          ))}
        </SearchResults>
      )}

      <MapContainer id="map">
        {/* 지도가 여기에 표시됩니다 */}
      </MapContainer>
    </Container>
  );
}

export default MapSearch;
