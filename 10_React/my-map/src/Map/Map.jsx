import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "./Mapstyle.css";

const Container = styled.div`
  margin: 30px;
  display: flex;
`;

const Sidebar = styled.div`
  width: 330px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
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
  width: 284px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  max-height: 200px;
  overflow-y: auto;
  z-index: 9;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  top: 10.5%;
`;

const CategoryList = styled.ul`
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

  &.selected {
    background-color: #f9f9f9;
    font-weight: bold;
    color: #007bff;
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

const NearbyList = styled.div`
  margin-top: 20px;
`;

const NearbyItem = styled.div`
  cursor: pointer;
  padding: 10px;
  border-bottom: 1px solid #eee;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f9f9f9;
  }
`;

function Map() {
  const [inputValue, setInputValue] = useState(""); // Search input value
  const [map, setMap] = useState(null); // Kakao map object
  const [markers, setMarkers] = useState([]); // Marker array
  const [searchResults, setSearchResults] = useState([]); // Search results
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1); // Selected item index
  const [selectedPlace, setSelectedPlace] = useState(null); // Selected place

  const infoWindow = useRef(); // Info window reference
  const timerRef = useRef(null); // Timer reference for debounce

  // Initialize Kakao map
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
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_KAKAO_APP_KEY&libraries=services";
      script.onload = initMap;
      document.head.appendChild(script);
    }
  }, []);

  // Handle input change for search
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      if (value.trim() !== "") {
        const ps = new window.kakao.maps.services.Places(map);
        ps.keywordSearch(value, (data, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setSearchResults(data);
          } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
            setSearchResults([]);
            console.log("No results found");
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            console.error("Error occurred while searching");
          }
        });
      } else {
        setSearchResults([]);
      }
    }, 300);
  };

  // Handle search button click
  const handleSearchClick = () => {
    if (inputValue.trim() !== "" && map) {
      const ps = new window.kakao.maps.services.Places(map);
      ps.keywordSearch(inputValue, placesSearchCB);
    } else {
      setSearchResults([]);
    }
  };

  // Callback for search results
  const placesSearchCB = (data, status) => {
    if (status === window.kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
      setSearchResults([]);
      console.log("No results found");
    } else if (status === window.kakao.maps.services.Status.ERROR) {
      console.error("Error occurred while searching");
    }
  };

  // Display places on map
  const displayPlaces = (places) => {
    markers.forEach((marker) => marker.setMap(null));
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

  // Display place information in info window
  const displayPlaceInfo = (marker, place) => {
    if (infoWindow.current) {
      infoWindow.current.close();
    }

    const newInfoWindow = new window.kakao.maps.InfoWindow({
      position: marker.getPosition(),
    });

    const content = document.createElement("div");
    content.className = "info-window";

    const closeButton = document.createElement("button");
    closeButton.className = "close-button";
    closeButton.innerHTML = "X";
    closeButton.onclick = () => newInfoWindow.close();
    content.appendChild(closeButton);

    const title = document.createElement("a");
    title.className = "title";
    title.href = place.place_url;
    title.target = "_blank";
    title.innerText = place.place_name;
    content.appendChild(title);

    const coordinates = document.createElement("div");
    coordinates.className = "coordinates";
    coordinates.innerText = `위도: ${place.y}, 경도: ${place.x}`;
    content.appendChild(coordinates);

    if (place.road_address_name) {
      const addressDiv = document.createElement("div");
      addressDiv.className = "address";
      const roadAddressSpan = document.createElement("span");
      roadAddressSpan.title = place.road_address_name;
      roadAddressSpan.innerText = place.road_address_name;
      addressDiv.appendChild(roadAddressSpan);
      addressDiv.appendChild(document.createElement("br"));
      const jibunSpan = document.createElement("span");
      jibunSpan.className = "jibun";
      jibunSpan.title = place.address_name;
      jibunSpan.innerText = place.address_name;
      addressDiv.appendChild(jibunSpan);
      content.appendChild(addressDiv);
    } else {
      const addressDiv = document.createElement("div");
      addressDiv.className = "address";
      addressDiv.title = place.address_name;
      addressDiv.innerText = place.address_name;
      content.appendChild(addressDiv);
    }

    newInfoWindow.setContent(content);
    newInfoWindow.open(map, marker);

    infoWindow.current = newInfoWindow;
  };

  // Select search result item
  const handleResultItemClick = (index) => {
    setSelectedItemIndex(index);
    const place = searchResults[index];
    if (map && place) {
      const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
      map.setCenter(moveLatLon);
      displayPlaces([place]);
    }
  };

  // Select nearby item
  const handleNearbyItemClick = (place) => {
    setSelectedPlace(place);
    if (map && place) {
      const moveLatLon = new window.kakao.maps.LatLng(place.y, place.x);
      map.setCenter(moveLatLon);
      displayPlaces([place]);
    }
  };

  const nearbyPlaces = [
    { place_name: "Place 1", y: 37.1234, x: 126.5678 },
    { place_name: "Place 2", y: 37.2345, x: 126.6789 },
    { place_name: "Place 3", y: 37.3456, x: 126.7890 },
  ];

  return (
    <Container>
      <Sidebar>
        <MenuBar>
          <SearchContainer>
            <Input
              type="text"
              placeholder="Search..."
              value={inputValue}
              onChange={handleInputChange}
            />
            <Button onClick={handleSearchClick}>
              <SearchIcon>&#x1F50D;</SearchIcon>
            </Button>
          </SearchContainer>
          {searchResults.length > 0 && (
            <SearchResults>
              <CategoryList>
                {searchResults.map((item, index) => (
                  <ResultItem
                    key={item.id}
                    className={index === selectedItemIndex ? "selected" : ""}
                    onClick={() => handleResultItemClick(index)}
                  >
                    {item.place_name}
                  </ResultItem>
                ))}
              </CategoryList>
            </SearchResults>
          )}
          <NearbyList>
            {nearbyPlaces.map((place, index) => (
              <NearbyItem
                key={index}
                onClick={() => handleNearbyItemClick(place)}
              >
                {place.place_name}
              </NearbyItem>
            ))}
          </NearbyList>
        </MenuBar>
      </Sidebar>
      <MapContainer id="map" />
    </Container>
  );
}

export default Map;
