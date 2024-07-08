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
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
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
  top: 6.3%;
`;

const CategoryList = styled.ul`
  margin-top: 20px;
  list-style-type: none;
  padding: 0;
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

function MapEX2() {
  const [inputValue, setInputValue] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const infoWindow = useRef();
  const timerRef = useRef(null);

  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(37.452381, 126.699562),
        level: 5,
      };

      const kakaoMap = new window.kakao.maps.Map(container, options);
      setMap(kakaoMap);
    };

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

      // 커스텀 정보창 내용 생성
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

      // 검색 결과와 입력 값 초기화
      setSearchResults([]);
      setInputValue("");
    }
  }, [selectedPlace, map]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // 입력이 있을 때마다 검색 결과를 가져오기 위해 타이머 사용
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

  useEffect(() => {
    if (!map) return;

    window.kakao.maps.event.addListener(map, "click", () => {
      if (infoWindow.current) {
        infoWindow.current.close();
      }
    });

  }, [map]);

  const displayPlaceInfo = (marker, place) => {
    if (infoWindow.current) {
      infoWindow.current.close();
    }
  
    const newInfoWindow = new window.kakao.maps.InfoWindow({
      position: marker.getPosition(),
    });
  
    const content = document.createElement('div');
    const closeButton = document.createElement('button');
    closeButton.className = 'close-button';
    closeButton.innerHTML = 'X';
    closeButton.onclick = () => newInfoWindow.close();
  
    content.appendChild(closeButton);
  
    const title = document.createElement('a');
    title.className = 'title';
    title.href = place.place_url;
    title.target = '_blank';
    title.innerText = place.place_name;
    content.appendChild(title);
  
    if (place.road_address_name) {
      const addressDiv = document.createElement('div');
      addressDiv.className = 'address';
      const roadAddressSpan = document.createElement('span');
      roadAddressSpan.title = place.road_address_name;
      roadAddressSpan.innerText = place.road_address_name;
      addressDiv.appendChild(roadAddressSpan);
      const jibunSpan = document.createElement('span');
      jibunSpan.className = 'jibun';
      jibunSpan.title = place.address_name;
      jibunSpan.innerText = `(지번 : ${place.address_name})`;
      addressDiv.appendChild(jibunSpan);
      content.appendChild(addressDiv);
    } else {
      const addressDiv = document.createElement('div');
      addressDiv.className = 'address';
      const addressSpan = document.createElement('span');
      addressSpan.title = place.address_name;
      addressSpan.innerText = place.address_name;
      addressDiv.appendChild(addressSpan);
      content.appendChild(addressDiv);
    }
  
    if (place.phone) {
      const telDiv = document.createElement('div');
      telDiv.className = 'tel';
      telDiv.innerText = place.phone;
      content.appendChild(telDiv);
    }
  
    if (place.opening_hours) {
      const openingHoursDiv = document.createElement('div');
      openingHoursDiv.className = 'opening-hours';
      openingHoursDiv.innerText = place.opening_hours;
      content.appendChild(openingHoursDiv);
    }
  
    if (place.reviews && place.reviews.length > 0) {
      const reviewsDiv = document.createElement('div');
      reviewsDiv.className = 'reviews';
      place.reviews.forEach((review) => {
        const reviewSpan = document.createElement('span');
        reviewSpan.innerText = review;
        reviewsDiv.appendChild(reviewSpan);
      });
      content.appendChild(reviewsDiv);
    }
  
    newInfoWindow.setContent(content);
    newInfoWindow.open(map, marker);
    infoWindow.current = newInfoWindow;
  };

  const displayPlaces = (places) => {
    removeMarkers();

    const newMarkers = places.map((place) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.y, place.x),
      });

      window.kakao.maps.event.addListener(marker, "click", function () {
        displayPlaceInfo(marker, place);
      });

      marker.setMap(map);
      return marker;
    });

    setMarkers(newMarkers);
  };

  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      console.log("검색 결과가 없습니다.");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      console.error("검색 중 오류가 발생했습니다.");
    }
  };

  const searchPlaces = (category) => {
    if (!category || !map) return;

    const ps = new window.kakao.maps.services.Places(map);
    ps.categorySearch(category, placesSearchCB, { useMapBounds: true });
  };

  const handleSearch = () => {
    if (!inputValue || !map) return;

    const ps = new window.kakao.maps.services.Places(map);
    ps.keywordSearch(inputValue, placesSearchCB);
  };

  const handleEnterSearch = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const removeMarkers = () => {
    markers.forEach((marker) => marker.setMap(null));
    setMarkers([]);
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  useEffect(() => {
    if (!map) return;

    removeMarkers();

    selectedCategories.forEach((category) => {
      searchPlaces(category);
    });

  }, [selectedCategories, map]);

  const handleSearchClick = () => {
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
          type="text"
          placeholder="장소를 검색하세요..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyUp={handleEnterSearch}
        />
        <Button onClick={handleSearchClick}>
          <SearchIcon>&#x1F50D;</SearchIcon>
        </Button>
      </SearchContainer>
      <SearchResults>
        {searchResults.length > 0 && (
          <CategoryList>
            {searchResults.map((place) => (
              <ResultItem
                key={place.id}
                onClick={() => handleSearchResultClick(place)}
              >
                {place.place_name}
              </ResultItem>
            ))}
          </CategoryList>
        )}
      </SearchResults>
      <MapContainer id="map" />
    </Container>
  );
}

export default MapEX2;
