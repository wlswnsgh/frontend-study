import React, { Component } from 'react';

class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      places: [],
      keyword: ''
    };
  }

  componentDidMount() {
    const script = document.createElement('script');
    script.async = true;
    script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=8eb4e510757118f8218df5b91c7413bf&libraries&libraries=services";

    script.onload = () => {
      window.kakao.maps.load(() => {
        const mapContainer = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.978),
          level: 5
        };

        const map = new window.kakao.maps.Map(mapContainer, options);
        this.setState({ map });
      });
    };

    document.head.appendChild(script);
  }

  handleInputChange = (e) => {
    this.setState({ keyword: e.target.value });
  };

  searchPlaces = () => {
    const { map, keyword } = this.state;
    const service = new window.kakao.maps.services.Places();

    service.keywordSearch(keyword, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        this.setState({ places: data });
        this.displayPlaces(data);
      } else {
        console.error('장소 검색 실패', status);
      }
    });
  };

  displayPlaces = (places) => {
    const { map } = this.state;
    const bounds = new window.kakao.maps.LatLngBounds();

    places.forEach((place) => {
      const marker = new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(place.y, place.x)
      });

      marker.setMap(map);

      window.kakao.maps.event.addListener(marker, 'click', () => {
        const infowindow = new window.kakao.maps.InfoWindow({
          content: `<div style="padding:5px;font-size:12px;">${place.place_name}</div>`
        });

        infowindow.open(map, marker);
      });

      bounds.extend(new window.kakao.maps.LatLng(place.y, place.x));
    });

    map.setBounds(bounds);
  };

  render() {
    return (
      <div>
        <div id="map" style={{ width: '100%', height: '400px' }}></div>
        <div>
          <input
            type="text"
            placeholder="장소 검색"
            value={this.state.keyword}
            onChange={this.handleInputChange}
          />
          <button onClick={this.searchPlaces}>검색</button>
        </div>
        <ul>
          {this.state.places.map((place) => (
            <li key={place.id}>{place.place_name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default MapContainer;
