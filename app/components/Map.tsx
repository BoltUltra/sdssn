"use client";

import { useState, useEffect } from "react";
import Map, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { LocationTick } from "iconsax-react";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoibGludGFuZzIiLCJhIjoiY2pzNDJkaGJuMDBscDRhbGczMm1nOGM3aSJ9.9mrUUK4Z_YX9bZDMm1YZFA";

const statesData = [
  { id: 1, latitude: 9.0765, longitude: 7.3986, name: "Abuja", users: 200 }, // FCT
  { id: 2, latitude: 6.5244, longitude: 3.3792, name: "Lagos", users: 350 }, // Lagos
  { id: 3, latitude: 7.1541, longitude: 3.348, name: "Ogun", users: 150 }, // Ogun
  { id: 4, latitude: 7.7199, longitude: 5.311, name: "Ekiti", users: 120 }, // Ekiti
  { id: 5, latitude: 7.5628, longitude: 4.5196, name: "Osun", users: 130 }, // Osun
  { id: 6, latitude: 4.8156, longitude: 7.0498, name: "Rivers", users: 180 }, // Rivers
  { id: 7, latitude: 6.5244, longitude: 5.7603, name: "Edo", users: 160 }, // Edo
  { id: 8, latitude: 11.8333, longitude: 13.15, name: "Borno", users: 100 }, // Borno
  { id: 9, latitude: 10.3158, longitude: 9.8442, name: "Bauchi", users: 110 }, // Bauchi
  { id: 10, latitude: 10.2897, longitude: 11.1673, name: "Gombe", users: 90 }, // Gombe
  { id: 11, latitude: 12.0022, longitude: 8.5919, name: "Kano", users: 250 }, // Kano
  { id: 12, latitude: 10.5105, longitude: 7.4165, name: "Kaduna", users: 220 }, // Kaduna
  { id: 13, latitude: 9.0578, longitude: 6.5806, name: "Niger", users: 140 }, // Niger
  { id: 14, latitude: 8.4799, longitude: 4.5418, name: "Kwara", users: 130 }, // Kwara
  { id: 15, latitude: 7.7275, longitude: 8.5392, name: "Benue", users: 120 }, // Benue
  { id: 16, latitude: 7.7969, longitude: 6.74, name: "Kogi", users: 110 }, // Kogi
  { id: 17, latitude: 11.7489, longitude: 11.966, name: "Yobe", users: 80 }, // Yobe
  { id: 18, latitude: 9.3265, longitude: 12.3984, name: "Adamawa", users: 100 }, // Adamawa
  { id: 19, latitude: 8.5475, longitude: 8.2336, name: "Nasarawa", users: 90 }, // Nasarawa
  { id: 20, latitude: 7.2508, longitude: 5.2103, name: "Ondo", users: 150 }, // Ondo
  { id: 21, latitude: 7.25, longitude: 5.0833, name: "Oyo", users: 200 }, // Oyo
  { id: 22, latitude: 5.8987, longitude: 5.6755, name: "Delta", users: 140 }, // Delta
  {
    id: 23,
    latitude: 5.0333,
    longitude: 7.9333,
    name: "Akwa Ibom",
    users: 130,
  }, // Akwa Ibom
  {
    id: 24,
    latitude: 4.9605,
    longitude: 8.3295,
    name: "Cross River",
    users: 120,
  }, // Cross River
  { id: 25, latitude: 4.9813, longitude: 6.2483, name: "Bayelsa", users: 110 }, // Bayelsa
  { id: 26, latitude: 7.3834, longitude: 3.9306, name: "Ogun", users: 150 }, // Ogun
  { id: 27, latitude: 8.9877, longitude: 11.7229, name: "Taraba", users: 100 }, // Taraba
  { id: 28, latitude: 9.2182, longitude: 9.517, name: "Plateau", users: 90 }, // Plateau
  { id: 29, latitude: 13.0536, longitude: 5.2476, name: "Sokoto", users: 80 }, // Sokoto
  { id: 30, latitude: 12.1617, longitude: 6.661, name: "Zamfara", users: 70 }, // Zamfara
  { id: 31, latitude: 12.9915, longitude: 7.6174, name: "Katsina", users: 60 }, // Katsina
  { id: 32, latitude: 12.4539, longitude: 4.1974, name: "Kebbi", users: 50 }, // Kebbi
  { id: 33, latitude: 12.1625, longitude: 9.5033, name: "Jigawa", users: 40 }, // Jigawa
  { id: 34, latitude: 5.4527, longitude: 7.5248, name: "Abia", users: 130 }, // Abia
  { id: 35, latitude: 5.572, longitude: 7.0631, name: "Imo", users: 120 }, // Imo
  { id: 36, latitude: 6.2209, longitude: 7.0705, name: "Anambra", users: 110 }, // Anambra
];

const MapWithUsers = () => {
  const [viewState, setViewState] = useState({
    longitude: 7.4951,
    latitude: 9.0579,
    zoom: 6,
  });

  useEffect(() => {
    const handleResize = () => {
      window.dispatchEvent(new Event("resize"));
    };

    // Trigger resize event when component mounts
    handleResize();

    // Trigger resize event on window resize
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Map
      {...viewState}
      style={{ width: "100%", height: "100%" }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={(evt) => setViewState(evt.viewState)}
    >
      {statesData.map((state) => (
        <Marker
          key={state.id}
          longitude={state.longitude}
          latitude={state.latitude}
        >
          <div className="flex bg-primary space-x-3 rounded-full text-white text-xs px-3 py-1 items-center hover:scale-110 transition-all duration-300 ease-in-out">
            <LocationTick size="12" color="#ffffff" />
            {state.name}: {state.users}
          </div>
        </Marker>
      ))}
    </Map>
  );
};

export default MapWithUsers;
