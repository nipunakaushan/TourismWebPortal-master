import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import GMap from './Gmap';
 
// API key of the google map
const GOOGLE_MAP_API_KEY = 'AIzaSyDhAfoPM5xfUnSw5zOvkk9OwwpkqZFm-OE';
 
// load google map script
const loadGoogleMapScript = (callback) => {
  if (typeof window.google === 'object' && typeof window.google.maps === 'object') {
    callback();
  } else {
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}`;
    window.document.body.appendChild(googleMapScript);
    googleMapScript.addEventListener("load", callback);
  }
}
 
const App = ({locations}) => {
  const [loadMap, setLoadMap] = useState(false);
 
  useEffect(() => {
    loadGoogleMapScript(() => {
      setLoadMap(true)
    });
  }, []);
 
  return (
    <div className="App">
      {
      !loadMap  ? <div>Loading...</div> 
      : 
      locations.length !==0 ? 
      <div className="jumbotron">
        <Row>
            {locations.map((location, index)=>{
            return (
                <>
                <Col md={6} style={{marginBottom: '60px'}}>
                    <h4>{location.name}</h4>
                    <p style={{minHeight: '100px'}}>{location.description}</p>
                    <GMap key={index} lat={location.latitudes} lon={location.longitudes} />
                </Col>
                
            </>
            ) 
            })}
        </Row>
        </div>
       :
        <div>Loading...</div> 
      }
    </div>
  );
}
 
export default App;