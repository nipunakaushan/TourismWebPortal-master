import React, { useEffect, useRef } from 'react';
 
const GMap = ({lat,lon}) => {
  const googleMapRef = useRef(null);
  let googleMap = null;
 
  useEffect(() => {
    googleMap = initGoogleMap();
    createMarker();
  }, []);

  // initialize the google map
  const initGoogleMap = () => {
    return new window.google.maps.Map(googleMapRef.current, {
      center: { lat: lat * 1, lng: lon * 1 },
      zoom: 8
    });
  }
 
  // create marker on google map
  const createMarker = () => new window.google.maps.Marker({
    position: { lat: lat * 1, lng: lon * 1 },
    map: googleMap
  });
 
  return <div
    ref={googleMapRef}
    style={{ width: '100%', height: 500 }}
  />
}
 
export default GMap;