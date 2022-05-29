import { MyLocation } from "@mui/icons-material";
import { useState } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	// useMap
} from "react-leaflet";
// import leaflet css

const Map = () => {
	const [position] = useState([4.636317, -74.082899]);
	return (
		<MapContainer
			center={position}
			zoom={30}
			scrollWheelZoom={true}
			style={{ height: "100%", width: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{/* // create a marker using mui icon */}
			<Marker
				icon={<MyLocation color="primary" style={{ margin: "-2px" }} />}
				position={position}
			>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
};

export default Map;
