import React, { useState, useRef } from "react";
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

const SearchResults = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  right: 0;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  max-height: 300px;
  overflow-y: auto;
  z-index: 10;
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
  const timerRef = useRef(null);

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
        // 여기서 실제 검색 로직을 추가하면 됩니다.
        // 현재는 가상의 검색 결과를 사용합니다.
        setSearchResults([
          { id: 1, place_name: `${value} 검색 결과 1` },
          { id: 2, place_name: `${value} 검색 결과 2` },
          { id: 3, place_name: `${value} 검색 결과 3` },
        ]);
      } else {
        setSearchResults([]);
      }
    }, 300);
  };

  const handleSelectPlace = (place) => {
    // 선택한 장소를 처리하는 로직을 추가할 수 있습니다.
    console.log("선택한 장소:", place);
  };

  return (
    <Container>
      <SearchContainer>
        <Input
          value={inputValue}
          onChange={handleInputChange}
          placeholder="장소를 검색하세요"
        />
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
    </Container>
  );
}

export default Map;
