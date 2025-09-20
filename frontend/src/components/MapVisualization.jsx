import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
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
  const [mapZoom, setMapZoom] = useState(5);
  const [mapCenter, setMapCenter] = useState([20.5937, 78.9629]); // Centered on India

  const handleZoomEnd = (event) => {
    setMapZoom(event.target.getZoom());
  };

  const handleMoveEnd = (event) => {
    setMapCenter(event.target.getCenter());
  };

  return (
    <section className="w-full max-w-4xl mx-auto mt-10 p-4 bg-gradient-to-br from-[#06132b] to-[#134880] rounded-2xl shadow-xl text-[#c8f2ff]">
      <h2 className="text-3xl font-bold mb-4 text-center tracking-wide drop-shadow-md">
        Map Visualization
      </h2>
      <div
        className="map-visualization rounded-xl shadow-xl overflow-hidden relative"
        style={{ height: "600px", width: "100%", border: "4px solid #18b8ff" }}
      >
        <MapContainer
          center={mapCenter}
          zoom={mapZoom}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          scrollWheelZoom={true}
          doubleClickZoom={true}
          onzoomend={handleZoomEnd}
          onmoveend={handleMoveEnd}
        >
          <LayersControl position="topright" collapsed={false} >
            {/* Base Map: OpenStreetMap */}
            <LayersControl.BaseLayer checked name="Street View">
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              />
            </LayersControl.BaseLayer>
            {/* Satellite View */}
            <LayersControl.BaseLayer name="Satellite View">
              <TileLayer
                url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                maxZoom={20}
                subdomains={["mt0", "mt1", "mt2", "mt3"]}
                attribution="&copy; Google Satellite"
              />
            </LayersControl.BaseLayer>
          </LayersControl>

          {/* Marker example */}
          <Marker position={[28.6139, 77.209]}>
            <Popup className="text-center font-semibold text-blue-700">
              📍 <strong>New Delhi</strong> <br /> Capital of India
            </Popup>
          </Marker>
          
          {/* Floating info box */}
          <div
            className="absolute top-4 left-4 bg-[#06132bcc] text-[#18b8ff] rounded-lg shadow-lg p-3 max-w-xs z-30 pointer-events-none select-none font-semibold text-sm"
            style={{ backdropFilter: "blur(10px)" }}
          >
            Use the layer control on the top-right to toggle between <b>Street View</b> and <b>Satellite View</b>. <br />
            Zoom in/out and drag to explore the map.
          </div>
        </MapContainer>
      </div>
      <style>{`
        .leaflet-control-layers {
          background: rgba(8, 26, 44, 0.85) !important;
          border: 1px solid #18b8ff !important;
          box-shadow: 0 0 12px #18b8ffaa !important;
          color: #c8f2ff !important;
          font-weight: 600;
          font-family: "Poppins", sans-serif;
        }
        .leaflet-popup-content-wrapper {
          background: rgba(24, 184, 255, 0.15);
          backdrop-filter: blur(8px);
          border-radius: 10px;
          box-shadow: 0 0 15px #18b8ff99;
          font-weight: 600;
          color: #06132b;
          font-family: "Poppins", sans-serif;
        }
        .leaflet-popup-content p, .leaflet-popup-content strong {
          color: #06132b;
        }
        .leaflet-popup-tip {
          background: rgba(24, 184, 255, 0.15);
        }
        .leaflet-marker-icon {
          filter: drop-shadow(0 0 5px #18b8ffcc);
          border-radius: 50%;
          border: 2px solid #18b8ffcc;
          transition: transform 0.3s ease;
        }
        .leaflet-marker-icon:hover {
          transform: scale(1.2);
          filter: drop-shadow(0 0 12px #18b8ff);
          cursor: pointer;
        }
      `}</style>
    </section>
  );
};

export default MapVisualization;
