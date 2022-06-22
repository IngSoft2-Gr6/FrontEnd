import { useState } from "react";
import React, { Component } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	// useMap
} from "react-leaflet";
// import leaflet css
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import API from "../../config/axios";
import { Typography } from "@mui/material";
import { until } from "../../helpers/until";
import { useEffect } from "react";
import {Paper} from "@mui/material";



const Map = () =>{

	const [parkings, setParkings] = useState( [] )
	
	const Parkings = async() =>{
		const res = await API.get("/parkingLots/");
		setParkings(res.data.data); 
		console.log(res.data.data);
	}

	useEffect( ()=>{
		Parkings();
	}, [])

	
	console.log(parkings);
	

	return (
		<MapContainer
			center={{lat:4.636317, lng:-74.082899}}
			zoom={15}
			scrollWheelZoom={true}
			style={{ height: "100 %", width: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{parkings.map((parking) =>(

				<Marker position={{lat:parking.coords[0], lng:parking.coords[1]}}>
					<Popup>
						<Paper>
							<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
								{parking.name}
							</Typography>
							<Typography variant="h5" component="div">
								{parking.description}
							</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								{parking.address}
							</Typography>
							<Typography variant="body2">
								{parking.fee}
								<br />
								{parking.capacity}
							</Typography>
						</Paper>

					</Popup>

				</Marker>

			))}

		</MapContainer>
	);
};

export default Map;
