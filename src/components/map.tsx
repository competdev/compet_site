import L from "leaflet"
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet"

import "leaflet/dist/leaflet.css"

import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"

L.Marker.prototype.options.icon = L.icon({
    iconUrl: icon.src,
    shadowUrl: iconShadow.src
});

const Map = () => {
    const position: L.LatLngTuple = [-19.9390501, -43.9991923]
    const zoom = 13
    return (
        <MapContainer
            center={position} zoom={zoom} scrollWheelZoom={true}
            style={{ height: 400, width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={position}>
                <Popup>
                    Sede do COMPET no CEFET-MG Campus Nova Gameleira
                </Popup>
            </Marker>
        </MapContainer>
    )
}

export default Map
