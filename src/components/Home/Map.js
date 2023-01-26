import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import SectionTitle from "../shared/SectionTitle";
import { Box } from "@mui/material";

const Map = () => {
  const dhaka = [23.81, 90.41];
  const sylhet = [24.89, 91.86];
  const chittagong = [22.35, 91.78];
  const kolkata = [22.57, 88.36];
  const delhi = [28.61, 77.2];

  const popups = [
    {
      position: dhaka,
      text: "Head Office",
    },
    {
      position: sylhet,
      text: "Distributor",
    },
    {
      position: chittagong,
      text: "Factory and Distributor",
    },
    {
      position: kolkata,
      text: "Factory, Distributor and Regional Head Office",
    },
    {
      position: delhi,
      text: "Distributor",
    },
  ];

  return (
    <Box sx={{ marginBottom: 8 }}>
      <SectionTitle>Our Locations</SectionTitle>
      <MapContainer
        id="map"
        className="h-96"
        center={dhaka}
        zoom={5}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {popups.map((popup) => (
          <Marker position={popup.position}>
            <Popup>{popup.text}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default Map;
