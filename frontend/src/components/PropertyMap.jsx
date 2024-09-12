import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon from "../../images/marker-icon.png";

const customIcon = new L.Icon({
  iconUrl: markerIcon, 
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const RecenterButton = ({ latitude, longitude, zoom }) => {
  const map = useMap();
  const handleRecenter = () => {
    map.setView([latitude, longitude], zoom, {
      animate: true,
    });
  };

  return (
    <button
      onClick={handleRecenter}
      style={{
        position: "absolute",
        zIndex: 1000,
        top: "10px",
        right: "10px",
        backgroundColor: "gray",
        color: "white",
        padding: "10px 15px",
        border: "none",
        borderRadius: "5px",
        opacity: 0.8,
      }}
    >
      Recenter Map
    </button>
  );
};

const PropertyMap = ({ latitude, longitude, zoom, title }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoom}
      style={{ height: "350px", width: "100%", position: "relative" }} 
      attributionControl={false}
    >
      <RecenterButton latitude={latitude} longitude={longitude} zoom={zoom} />
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      <Marker position={[latitude, longitude]} icon={customIcon}>
        <Popup>{title}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default PropertyMap;
