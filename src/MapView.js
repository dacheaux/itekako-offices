import React, { Component } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

const mapStyles = {
  width: "100%",
  height: "100%"
};

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  };

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  };

  render() {
    const { offices, zoom } = this.props;
    const { selectedPlace, activeMarker, showingInfoWindow } = this.state;
    const infoStyle = {
      WebkitLineClamp: 5,
      WebkitBoxOrient: "vertical"
    };
    return (
      <Map
        google={this.props.google}
        zoom={zoom}
        style={mapStyles}
        initialCenter={{ lat: 20, lng: 0 }}
      >
        {offices.map(o => (
          <Marker
            onClick={this.onMarkerClick}
            name={o.name}
            description={o.description}
            photo={o.photo}
            position={{ lat: o.latitude, lng: o.longitude }}
          />
        ))}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={this.onClose}
        >
          <div className="selected-place">
            <img src={selectedPlace.photo} alt="" />
            <h2>{selectedPlace.name}</h2>
            <p style={infoStyle}>{selectedPlace.description}</p>
          </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyD0egX_vPPcueSHBbpyGDbrj0XLcacxFCs"
})(MapContainer);
