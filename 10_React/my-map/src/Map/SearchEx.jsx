import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin: 30px;
  position: relative;
`;

const SearchContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 300px;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 25px;
  outline: none;
`;

const SearchResults = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  width: 100%;
  max-height: 200px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 10;
  display: ${props => (props.show ? "block" : "none")};
`;

const ResultItem = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`;

function SearchEx() {
    const [inputValue, setInputValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);
  
    const handleInputChange = (event) => {
      const value = event.target.value;
      setInputValue(value);
  
      // 가상의 검색 결과를 사용합니다. 실제 API 호출로 대체할 수 있습니다.
      if (value.trim() !== "") {
        setSearchResults([
          { id: 1, place_name: `${value} 검색 결과 1` },
          { id: 2, place_name: `${value} 검색 결과 2` },
          { id: 3, place_name: `${value} 검색 결과 3` },
        ]);
        setShowResults(true);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    };
  
    const handleSelectPlace = (place) => {
      setInputValue(place.place_name);
      setShowResults(false); // 검색 결과 목록 숨기기
      // 선택한 장소에 대한 처리 로직을 추가할 수 있습니다.
    };
  
    return (
      <Container>
        <SearchContainer>
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="장소를 검색하세요"
          />
          <SearchResults show={showResults}>
            {searchResults.map((place) => (
              <ResultItem key={place.id} onClick={() => handleSelectPlace(place)}>
                {place.place_name}
              </ResultItem>
            ))}
          </SearchResults>
        </SearchContainer>
  
        {/* 기타 UI 요소 */}
        <div style={{ marginTop: "40px", padding: "20px", backgroundColor: "#f0f0f0", borderRadius: "5px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" }}>
          기타 UI 요소
        </div>
      </Container>
    );
}

export default SearchEx;
