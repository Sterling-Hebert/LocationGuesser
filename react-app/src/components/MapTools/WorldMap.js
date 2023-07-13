import React from "react";
import ControlBox from "./GameControl.js";
import { WorldPlaces } from "./places.js";
import {
  GoogleMap,
  LoadScript,
  StreetViewPanorama,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./defaultMap.css";

function WorldMap() {
  const mapContainerStyle = {
    height: "100vh",
    width: "100vw",
  };

  const center = {
    lat: 50,
    lng: -50,
  };

  const [currentPosition, setCurrentPosition] = useState({});
  const [positions, setPositions] = useState([]);

  const streetViewOptions = {
    disableDefaultUI: true,
    showRoadLabels: false,
    enableCloseButton: false,
    enableCompass: true,
  };

  const generateNewPosition = () => {
    let pos = WorldPlaces[Math.floor(Math.random() * WorldPlaces.length)];
    while (positions.includes(pos)) {
      pos = WorldPlaces[Math.floor(Math.random() * WorldPlaces.length)];
    }
    return pos;
  };

  const updatePosition = () => {
    let currentPlace = generateNewPosition();
    setPositions((positions) => [...positions, currentPlace]);
    setCurrentPosition(currentPlace);
    return currentPlace;
  };

  const clearPositions = () => {
    setPositions([]);
  };

  useEffect(() => {
    updatePosition();
  }, []);

  return (
    <div className="App">
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          options={{ disableDefaultUI: true }}
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={1}
        >
          <StreetViewPanorama

            options={streetViewOptions}
            position={currentPosition}
            visible={true}
            className="streetviewpanel"
          >
          </StreetViewPanorama>
          <div
            className="dialog-wrapper"
            style={{ zIndex: 99, position: "relative" }}
          >
            <ControlBox
              clearPositions={clearPositions}
              updatePos={updatePosition}
              pos={currentPosition}
              className="map"
            />
          </div>
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default WorldMap;
