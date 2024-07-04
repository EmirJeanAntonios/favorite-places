import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useLocationStore } from "../../stores/useLocationStore";
import { useEffect } from "react";

const MapView = () => {
  return (
    <MapContainer center={[40.5698389, 34.7269292]} zoom={13} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapComponent />
    </MapContainer>
  );
};

const MapComponent: React.FC = () => {
  const { lat, lon } = useLocationStore();
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon]);
  }, [lat, lon, map]);

  return (
    <Marker position={[lat, lon]}>
      <Popup>
        latitude: {lat} <br />
        longitude: {lon}
      </Popup>
    </Marker>
  );
};

export default MapView;
