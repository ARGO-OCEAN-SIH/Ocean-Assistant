import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const MapVisualization = () => {
  return (
    <div className="map-visualization" style={{ height: "500px", width: "100%" }}>
      <MapContainer center={[28.6139, 77.209]} zoom={13} style={{ height: "100%", width: "100%" }}>
        {/* OpenStreetMap Tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {/* Example Marker */}
        <Marker position={[28.6139, 77.209]}>
          <Popup>
            📍 New Delhi <br /> You are here!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default MapVisualization;
