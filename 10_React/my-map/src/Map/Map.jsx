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

function Map() {
  const [inputValue, setInputValue] = useState(""); // Search query state
  const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories state
  const [map, setMap] = useState(null); // Kakao map object state
  const [markers, setMarkers] = useState([]); // Markers state
  const [selectedPlace, setSelectedPlace] = useState(null); // Selected place state
  const [searchResults, setSearchResults] = useState([]); // Search results state
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1); // Selected item index state
  const [savedSearches, setSavedSearches] = useState([]); // Saved searches state

  const infoWindow = useRef(); // Kakao info window useRef
  const timerRef = useRef(null); // Search debounce timer useRef
  const searchResultsRef = useRef(null); // Search results useRef

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
        "//dapi.kakao.com/v2/maps/sdk.js?appkey=8eb4e510757118f8218df5b91c7413bf&libraries&libraries=services";
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

      setSearchResults([]);
    }
  }, [selectedPlace, map]);

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
            console.log("No results found.");
          } else if (status === window.kakao.maps.services.Status.ERROR) {
            console.error("Error occurred during search.");
          }
        });
      } else {
        setSearchResults([]);
      }
    }, 300);
  };

  const handleSelectPlace = (place) => {
    const marker = new window.kakao.maps.Marker({
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    window.kakao.maps.event.addListener(marker, "click", function () {
      displayPlaceInfo(marker, place);
    });

    marker.setMap(map);

    setSearchResults([]);
    map.panTo(new window.kakao.maps.LatLng(place.y, place.x));

    setSelectedItemIndex(-1);

    // Save the search
    setSavedSearches([...savedSearches, place]);
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
    content.className = 'info-window';

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

    const coordinates = document.createElement('p');
    coordinates.className = 'coordinates';
    coordinates.innerText = `Coordinates: (${place.y}, ${place.x})`;
    content.appendChild(coordinates);

    if (place.road_address_name) {
      const addressDiv = document.createElement('div');
      addressDiv.className = 'address';
      addressDiv.innerText = place.road_address_name;
      content.appendChild(addressDiv);
    }

    const container = document.createElement('div');
    container.className = 'infowindow-container';
    container.appendChild(content);
    newInfoWindow.setContent(container);
    newInfoWindow.open(map, marker);
    infoWindow.current = newInfoWindow;
  };

  const handleKeyPress = (event) => {
    if (event.key === "ArrowDown" && selectedItemIndex < searchResults.length - 1) {
      setSelectedItemIndex(selectedItemIndex + 1);
    } else if (event.key === "ArrowUp" && selectedItemIndex > 0) {
      setSelectedItemIndex(selectedItemIndex - 1);
    } else if (event.key === "Enter" && selectedItemIndex !== -1) {
      handleSelectPlace(searchResults[selectedItemIndex]);
    }
  };

  return (
    <Container>
      <Sidebar>
        <MenuBar>
          <SearchContainer>
            <Input
              type="text"
              placeholder="Search places..."
              value={inputValue}
              onChange={handleInputChange}
              onKeyDown={handleKeyPress}
            />
            <Button>
              <SearchIcon className="fa fa-search" />
            </Button>
          </SearchContainer>
          {searchResults.length > 0 && (
            <SearchResults ref={searchResultsRef}>
              <CategoryList>
                {searchResults.map((result, index) => (
                  <ResultItem
                    key={result.id}
                    className={index === selectedItemIndex ? "selected" : ""}
                    onClick={() => handleSelectPlace(result)}
                  >
                    {result.place_name}
                  </ResultItem>
                ))}
              </CategoryList>
            </SearchResults>
          )}
          {savedSearches.length > 0 && (
            <div>
                {savedSearches.map((search, index) => (
                  <div 
                    key={index}
                    
                  >{search.place_name}</div>
                ))}
            </div>
          )}
        </MenuBar>
      </Sidebar>
      <MapContainer id="map" />
    </Container>
  );
}

export default Map;
