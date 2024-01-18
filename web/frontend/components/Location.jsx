import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import { Icon } from "leaflet";
import { useUI } from "../contexts/ui.context";

export const LocationComponent = () => {
  const { locations } = useUI();
  return (
    <div className="">
      <MapContainer
        center={[37.09024, -95.712891]}
        zoom={1}
        style={{ height: "300px" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {locations?.map((item, index) => (
          <Marker
            key={index}
            position={[item.latitude, item.longitude]}
            icon={
              new Icon({
                iconUrl: markerIconPng,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
              })
            }
          >
            <Popup>
              <div>
                <strong>Title: </strong> {item.title}
                <br />
                {item.othersInfo}
                <br />
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
