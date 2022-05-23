import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Map = () => {
    const dhaka = [23.81, 90.41];
    const sylhet = [24.89, 91.86];
    const chittagong = [22.35, 91.78];
    const kolkata = [22.57, 88.36];
    const delhi = [28.61, 77.20];

    return (
        <div className='mb-32'>
            <h1 className='text-5xl font-bold text-center'>Our Locations</h1>
            <div className="divider"></div>
            <p className='text-xl text-center mb-5'>Besides these regional offices, we have many reliable dealers all across South Asia to conduct our business.</p>
            <MapContainer id='map' className='h-96' center={dhaka} zoom={5} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={dhaka}>
                    <Popup>
                        Dhaka Head Office
                    </Popup>
                </Marker>
                <Marker position={sylhet}>
                    <Popup>
                        Sylhet Regional Office
                    </Popup>
                </Marker>
                <Marker position={chittagong}>
                    <Popup>
                        Chittagong Regional Office
                    </Popup>
                </Marker>
                <Marker position={kolkata}>
                    <Popup>
                        Kolkata Regional Office
                    </Popup>
                </Marker>
                <Marker position={delhi}>
                    <Popup>
                        New Delhi Regional Head Office
                    </Popup>
                </Marker>
            </MapContainer>
            <div className="divider"></div>
        </div>
    );
};

export default Map;