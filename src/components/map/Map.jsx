import { useState } from "react";
import {
	MapContainer,
	Marker,
	Popup,
	TileLayer,
	// useMap
} from "react-leaflet";
// import leaflet css
import API from "../../config/axios";
import { Typography, Paper, Grid,Avatar } from "@mui/material";
import { useEffect } from "react";



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
	

	return (
		<MapContainer
			center={{lat:4.636317, lng:-74.082899}}
			zoom={15}
			scrollWheelZoom={true}
			style={{ height: "100%", width: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>

			{parkings.map((parking) =>(

				<Marker position={{lat:parking.coords[0], lng:parking.coords[1]}}>
					<Popup>
						<Paper elevation={12} style={{ padding: "1rem", borderRadius: "1rem" }}>
							<Grid container spacing="15" width="100%">
								<Grid item xs={12}>
									<Grid container spacing="50">
										<Grid item lg={3} md={4} sm={4} xs={12}>
											<Avatar style={{  top: "50%" ,left: "50%"}}>{parking.name.charAt(0)} </Avatar>
										</Grid>
										<Grid item lg={9} md={8} sm={8} xs={12}>
											<Typography>{parking.name}</Typography>
											<Typography>{parking.address}</Typography>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<Grid container>
										<Grid item lg={6} md={6} sm={6} xs={6}>
											<Avatar><Typography >{parking.fee}</Typography></Avatar>
											Tarifa
										</Grid>
										<Grid item lg={6} md={6} sm={6} xs={6}>
											<Avatar><Typography>{parking.capacity}</Typography></Avatar>
											Capacidad
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<Grid container spacing="3">
										<Grid item lg={12} md={12} sm={12} xs={12}>
											<Typography>{parking.description}</Typography>
										</Grid>
									</Grid>
								</Grid>



							</Grid>
						</Paper>
					</Popup>
				</Marker>

			))}

		</MapContainer>
	);
};

export default Map;
