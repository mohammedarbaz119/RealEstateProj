import { MapContainer, TileLayer } from 'react-leaflet'
import './map.scss'
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import Pin from '../pin/Pin';


import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;
function Map({items}){
  return (
    <MapContainer center={items.length===1?[items[0].latitude,items[0].longitude] :[23.1466, 79.0888]} zoom={5} scrollWheelZoom={false} className='map'>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {items.map(item=>(
      <Pin item={item} key={item.id}/>
    ))}
  </MapContainer>
  )
}

export default Map