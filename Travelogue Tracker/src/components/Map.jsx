import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

import { useCities } from "../contexts/CitiesContext";

import "leaflet/dist/leaflet.css"; // Import Leaflet CSS for styling
import styles from "./Map.module.css";

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lng = searchParams.get("lng");
  const lat = searchParams.get("lat");
  const [mapPosition, setMapPosition] = useState([50, 0]);

  const navigate = useNavigate();

  const cities = useCities();

  useEffect(() => {
    if (lng && lat) {
      setMapPosition([lat, lng]);
    }
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <div className={styles.map}>
        <MapContainer
          center={mapPosition} // Initial map center coordinates (latitude, longitude)
          zoom={6} // Initial zoom level
          className={styles.map} // Set map size via CSS class
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png" // Tile layer source
          />
          {cities.map((city) => (
            <Marker
              key={city.id}
              position={[city.position.lat, city.position.lng]}
            >
              <Popup>
                <span>{city.emoji}</span>
                <span> {city.cityName}</span>
              </Popup>
            </Marker>
          ))}
          <ChangeCenter position={mapPosition} />
        </MapContainer>
      </div>
    </div>
  );
}

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position, map.getZoom());
  return null;
}
