import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  height: 350px;
`;

const CategoryList = styled.ul`
  position: absolute;
  top: 10px;
  right: 10px;
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
  width: 100px;
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

const categories = [
  { id: 'BK9', name: '은행' },
  { id: 'MT1', name: '대형마트' },
  { id: 'PM9', name: '약국' },
  { id: 'OL7', name: '주유소, 충전소' },
  { id: 'CE7', name: '카페' },
  { id: 'CS2', name: '편의점' },
  { id: 'PS3', name: '어린이집, 유치원' },
  { id: 'SC4', name: '학교' },
  { id: 'AC5', name: '학원' },
  { id: 'PK6', name: '주차장' },
  { id: 'SW8', name: '지하철역' },
  { id: 'CT1', name: '문화시설' },
  { id: 'AG2', name: '중개업소' },
  { id: 'PO3', name: '공공기관' },
  { id: 'AT4', name: '관광명소' },
  { id: 'AD5', name: '숙박' },
  { id: 'FD6', name: '음식점' },
  { id: 'HP8', name: '병원' }
];

const Map = () => {
  const [map, setMap] = useState(null);
  const [currCategory, setCurrCategory] = useState('');

  useEffect(() => {
    const script = document.createElement('script');
    script.async = true;
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=8eb4e510757118f8218df5b91c7413bf&libraries&libraries=services";
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapOptions = {
          center: new window.kakao.maps.LatLng(37.566826, 126.9786567),
          level: 5
        };
        const kakaoMap = new window.kakao.maps.Map(document.getElementById('map'), mapOptions);
        setMap(kakaoMap);
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  useEffect(() => {
    if (!map) return;

    const category = document.getElementById('category');
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

  const onClickCategory = (e) => {
    const categoryId = e.target.id;
    setCurrCategory(categoryId);

    // 여기서 해당 카테고리에 대한 마커를 표시하는 로직을 추가해야 합니다.
  };

  return (
    <MapContainer>
      <div id="map" style={{ width: '100%', height: '100%' }}></div>
      <CategoryList id="category">
        {categories.map(category => (
          <CategoryItem key={category.id} id={category.id} className={currCategory === category.id ? 'on' : ''} active={currCategory === category.id}>
            <span className={`category_bg ${getCategoryIcon(category.id)}`}></span>
            {category.name}
          </CategoryItem>
        ))}
      </CategoryList>
    </MapContainer>
  );
};

const getCategoryIcon = (categoryId) => {
  // 각 카테고리에 따라 적절한 아이콘 클래스명을 반환하는 함수입니다.
  switch (categoryId) {
    case 'BK9':
      return 'bank';
    case 'MT1':
      return 'mart';
    case 'PM9':
      return 'pharmacy';
    case 'OL7':
      return 'oil';
    case 'CE7':
      return 'cafe';
    case 'CS2':
      return 'store';
    case 'PS3':
      return 'school';
    case 'SC4':
      return 'school';
    case 'AC5':
      return 'school';
    case 'PK6':
      return 'parking';
    case 'SW8':
      return 'subway';
    case 'CT1':
      return 'museum';
    case 'AG2':
      return 'building';
    case 'PO3':
      return 'government';
    case 'AT4':
      return 'tourist';
    case 'AD5':
      return 'hotel';
    case 'FD6':
      return 'restaurant';
    case 'HP8':
      return 'hospital';
    default:
      return '';
  }
};

export default Map;
