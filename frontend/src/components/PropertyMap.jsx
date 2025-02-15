import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const PropertyMap = ({ latitude, longitude }) => {
  if (!latitude || !longitude) {
    return <p>Location data not available</p>;
  }

  return (
    <div style={{ width: "100%", height: "400px" }}>
      <MapContainer center={[latitude, longitude]} zoom={15} style={{ width: "100%", height: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[latitude, longitude]}>
          <Popup>Property Location</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default PropertyMap;
