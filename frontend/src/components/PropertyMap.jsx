import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from 'leaflet';
import markerIcon from '../../images/marker-icon.png';

const customIcon = new L.Icon({
  iconUrl: markerIcon, 
  iconSize: [50, 50],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});
const PropertyMap = ({ latitude, longitude, zoom, title }) => {  
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={zoom}
      style={{ height: "350px", width: "100%" }}
      attributionControl={false}
    >
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