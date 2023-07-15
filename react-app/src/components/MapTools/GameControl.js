import React, { useEffect, useState, useRef, useCallback, } from 'react';
import { GoogleMap, Marker, Polyline } from "@react-google-maps/api";
import { useHistory } from 'react-router-dom';
import "./GameControl.css";
import { useDispatch } from 'react-redux';
import { completeGame } from '../../store/games';

export default function ControlBox(props) {
  const mapRef = useRef();
  const history = useHistory();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const center = {
    lat: 10,
    lng: 0,
  };
  const streetViewOptions = {
    disableDefaultUI: true,
    showRoadLabels: false,
    enableCloseButton: false,
    enableCompass: true,
  };
  const mapContainerStyle = {
  position: "fixed",
  // top: "10px",
  height: "45vh",
  width: "25vw",
  // filter: "invert(100%)"
};
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setSavedZoom(mapRef.current.getZoom());
    setSavedCenter({
      lat: mapRef.current.getCenter().lat(),
      lng: mapRef.current.getCenter().lng(),
    });
    setOpen(false);
  };
  const [savedCenter, setSavedCenter] = useState(center);
  const [savedZoom, setSavedZoom] = useState(1);

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const [guessMarker, setGuessMarker] = useState(null);
  const [currentPosition, setCurrentPosition] = useState(props.pos);
  const [currentPositionMarker, setCurrentPositionMarker] = useState(
    props.pos
  );
  const [showResult, setShowResult] = useState(false);
  const [points, setPoints] = useState(0);
  const [currentRound, setCurrentRound] = useState(1);
  const [pointsGiven, setPointsGiven] = useState(0);
  const [currentDistance, setDistance] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);

  function deg2rad(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
  }

  const calculateDistance = (latitude1, longitude1, latitude2, longitude2) => {
    var earthRadius = 6371;
    var dLat = deg2rad(latitude2 - latitude1);
    var dLon = deg2rad(longitude2 - longitude1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(latitude1)) *
      Math.cos(deg2rad(latitude2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = earthRadius * c;
    return d;
  };

  const givePoints = (distance) => {
    let maxDistance = 1000;
    let result;
    if (distance > maxDistance) return 0;
    let difference = maxDistance - distance;
    if (difference < 50) {
      result = 5000;
      setPoints(points + result);
      return result;
    }else if( difference < 400){
      result = 4000;
      setPoints(points + result);
      return result;
    }else if(difference < 600){
      result = 3000;
      setPoints(points + result);
      return result;
    }else if(difference < 800){
      result = 2500;
      setPoints(points + result);
      return result;
    }
    else {
      result = 5 * Math.floor(maxDistance - distance);
      setPoints(points + result);
      return result;
    }
  };

  const handleGuess = () => {
    if (guessMarker === null) return;
    let result = calculateDistance(
      guessMarker.lat,
      guessMarker.lng,
      currentPosition.lat,
      currentPosition.lng
    );
    setDistance(result);
    let thisQpoints = givePoints(result);
    setPointsGiven(thisQpoints);
    setCurrentPositionMarker(currentPosition);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    let gamePoints = points
    if (currentRound === 5) {
      setGameFinished(true);
      dispatch(completeGame(gamePoints));
      return;
    }
    let nextPlace = props.updatePos();
    setOpen(false);
    setSavedCenter(center);
    setGuessMarker(null);
    setCurrentPosition(nextPlace);
    setCurrentPositionMarker(nextPlace);
    setShowResult(false);
    setDistance(0);
    setCurrentRound(currentRound + 1);
  };



  const newGame = () => {
    let nextPlace = props.updatePos();
    setOpen(false);
    setSavedCenter(center);
    setGuessMarker(null);
    setCurrentPosition(nextPlace);
    setCurrentPositionMarker(nextPlace);
    setShowResult(false);
    setDistance(0);
    setCurrentRound(0);
    setPoints(0);
    setGameFinished(false);
    props.clearPositions();
  };

  const backButton = () => {
    history.push('/main-menu');
  };

  return (
    <>
      {gameFinished ? (
        <div className='dialog-overlay'>
          <h3 className='title'>
            Game finished! You got {points}/25000 points!
          </h3>
          <button className="end-button" onClick={backButton}>
            Home
          </button>
          <button className='end-button' onClick={newGame}>
            Play again
          </button>

        </div>
      ) : (
        <div>
         {!open && (
          <><button className='start-button' onClick={handleClickOpen}>
               Click to open guess overlay
            </button>
          </>
               )}
          {open && (
            <div className="dialog-overlay">
              <div className="dialog">
                <div className="dialog-header">
                <button className="exit-button" onClick={backButton}>
                  Exit Game
                  </button>
                  <button className="close-button" onClick={handleClose}>
                  Close Overlay
                  </button>
                  <h3 className='title'>
                    Round {currentRound}/5
                    <br></br>
                    Points {points}
                  </h3>

                  {showResult ? (
                    <button className="guess-button" onClick={handleNextQuestion}>
                      Continue
                    </button>
                  ) : (
                    <button className="guess-button" onClick={handleGuess}>
                      Confirm Guess
                    </button>
                  )}{showResult ? (
                    <h3 className="title">
                      You received {pointsGiven} points, your guess was{" "}
                      {currentDistance.toFixed(2) }m away from the target!
                    </h3>
                  ) : (
                    <h3 className="title1">
                      Click anywhere on the map to make your guess!
                    </h3>
                  )}

                </div>
                <div className="dialog-content">
                  <GoogleMap
                    options={streetViewOptions }
                    mapContainerStyle={mapContainerStyle}
                    center={savedCenter}
                    zoom={savedZoom}
                    clickableIcons={false}
                    onLoad={onMapLoad}
                    onClick={(event) => {
                      if (showResult) return;
                      setGuessMarker({
                        lat: event.latLng.lat(),
                        lng: event.latLng.lng(),
                      });
                    }}
                  >
                    <Marker
                      position={guessMarker}
                      icon={{
                        url: guessMarker,
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                      }}
                      title={"Your guess"}
                    ></Marker>
                    <Marker
                      position={currentPositionMarker}
                      visible={showResult}
                      icon={{
                        url: guessMarker,
                        scaledSize: new window.google.maps.Size(30, 30),
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(15, 15),
                      }}
                      title={"Correct Location"}
                    ></Marker>
                    {showResult ? (
                      <Polyline
                        path={[guessMarker, currentPositionMarker]}
                        visible={showResult}
                      ></Polyline>
                    ) : null}
                  </GoogleMap>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
