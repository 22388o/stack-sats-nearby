import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
} from "react-leaflet";
import * as L from "leaflet";
import "./App.css";
import atmData from "./data/north-america.json";

export default function Map() {
  const LeafIcon = L.Icon.extend({
    options: {},
  });

  const atmIcon = new LeafIcon({
    iconUrl:
      "https://raw.githubusercontent.com/aarontorres0/stack-sats-nearby/master/src/bitcoinde.svg",
    iconSize: [26, 26],
  });

  return (
    <MapContainer center={[37, -94]} zoom={5} scrollWheelZoom={true}>
      <LayersControl position="topright">
        <LayersControl.BaseLayer checked name="OpenStreetMap.Mapnik">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap.BlackAndWhite">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
          />
        </LayersControl.BaseLayer>
      </LayersControl>
      {atmData.map((atm) => (
        <Marker
          icon={atmIcon}
          key={atm.properties.address}
          position={[atm.geometry.coordinates[1], atm.geometry.coordinates[0]]}
        >
          <Popup>
            <h2 style={{ color: "orange" }}>{atm.properties.name}</h2>
            <h3>{atm.properties.address}</h3>
            <h4 style={{ color: "grey" }}>{atm.properties.hours}</h4>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
