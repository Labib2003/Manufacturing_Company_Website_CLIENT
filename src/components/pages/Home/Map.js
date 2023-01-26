import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const Map = () => {
  const dhaka = [23.81, 90.41];
  const sylhet = [24.89, 91.86];
  const chittagong = [22.35, 91.78];
  const kolkata = [22.57, 88.36];
  const delhi = [28.61, 77.2];

  return (
    <Box sx={{ marginBottom: 8 }}>
      <Divider />
      <Typography
        variant="h4"
        color="primary"
        align="center"
        sx={{ margin: ".5rem 0" }}
      >
        Our Locations
      </Typography>
      <Divider />
      <Typography variant="h6" align="center" sx={{marginTop: 1}} gutterBottom>
        Besides these regional offices, we have many reliable dealers all across
        South Asia to conduct our business.
      </Typography>
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
        <Marker position={dhaka}>
          <Popup>Dhaka Head Office</Popup>
        </Marker>
        <Marker position={sylhet}>
          <Popup>Sylhet Regional Office</Popup>
        </Marker>
        <Marker position={chittagong}>
          <Popup>Chittagong Regional Office</Popup>
        </Marker>
        <Marker position={kolkata}>
          <Popup>Kolkata Regional Office</Popup>
        </Marker>
        <Marker position={delhi}>
          <Popup>New Delhi Regional Head Office</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};

export default Map;
