import React, { useState, useEffect, useRef } from "react";
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
  height: 50vh;
`;

const SearchResults = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const ResultItem = styled.li`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

function Map() {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const infoWindow = useRef();

  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=8eb4e510757118f8218df5b91c7413bf&libraries&libraries=services";
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
    }
  }, [selectedPlace, map]);

  const handleSearch = () => {
    if (!inputValue || !map) return;

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
  };

  const handleSelectPlace = (place) => {
    setSelectedPlace(place);
  };

  const EnterSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <Container>
      <SearchContainer>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyUp={EnterSearch}
          placeholder="장소를 검색하세요"
        />
        <Button onClick={handleSearch}>
          <SearchIcon>🔍</SearchIcon>
        </Button>
      </SearchContainer>

      <SearchResults>
        {searchResults.map((place) => (
          <ResultItem key={place.id} onClick={() => handleSelectPlace(place)}>
            {place.place_name}
          </ResultItem>
        ))}
      </SearchResults>

      <MapContainer id="map">
        {/* 지도가 여기에 표시됩니다 */}
      </MapContainer>
    </Container>
  );
}

export default Map;
