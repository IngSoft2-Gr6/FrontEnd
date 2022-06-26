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
import { useLocation, useNavigate } from "react-router-dom";
import {
	Typography,
	Paper,
	Grid,
	Avatar,
	Button,
	Modal,
	Box,
} from "@mui/material";
import { useEffect, useContext } from "react";
import ParkingRating from "../../views/ParkingLotRating";
import ReserveConfirm from "../../views/ReserveConfirm";
import { UserContext } from "../../context/UserContext";
import FormHooks from "../../hooks/formHooks";
import { ratingSchema } from "../../schemas/rating";
import Rating from "@mui/material/Rating";


const Map = () => {
	const { formProps } = FormHooks(ratingSchema, "onChange");
	const { user } = useContext(UserContext);
	const [parkings, setParkings] = useState([]);
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const Parkings = async () => {
		const res = await API.get("/parkingLots/");
		setParkings(res.data.data);
		console.log(res.data.data);
	};

	useEffect(() => {
		Parkings();
		setModal(location.hash.replace("#", ""));
	}, [user, location]);

	return (
		<MapContainer
			center={{ lat: 4.636317, lng: -74.082899 }}
			zoom={15}
			scrollWheelZoom={true}
			style={{ height: "100%", width: "100%" }}
		>
			<TileLayer
				attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
				url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
			/>

			{parkings.map((parking) => (
				<Marker position={{ lat: parking.coords[0], lng: parking.coords[1] }}>
					<Popup>
						<Paper
							elevation={12}
							sx={{
								margin: "0px",
								padding: "1rem",
								borderRadius: "1rem",
								overflow: "auto",
								height: "400px",
							}}
						>
							<Grid container spacing="15" width="100%">
								<Grid item xs={12}>
									<Grid container spacing="50">
										<Grid item lg={3} md={4} sm={4} xs={12}>
											<Avatar
												style={{
													top: "50%",
													left: "50%",
													width: "50px",
													height: "50px",
												}}
											>
												{parking.name.charAt(0)}{" "}
											</Avatar>
										</Grid>
										<Grid item lg={9} md={8} sm={8} xs={12}>
											<Typography>{parking.name}</Typography>
											<Typography>{parking.address}</Typography>
											<Rating
												name="Rating Parking Lot"
												defaultValue={2.5}
												precision={0.5}
												{...formProps("ratingParkingLot")}
											/>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<Grid container>
										<Grid item lg={6} md={6} sm={6} xs={6}>
											<Avatar>
												<Typography>{parking.fee}</Typography>
											</Avatar>
											Tarifa
										</Grid>
										<Grid item lg={6} md={6} sm={6} xs={6}>
											<Avatar>
												<Typography>{parking.capacity}</Typography>
											</Avatar>
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
								{user ? (
									<Grid item xs={12}>
										<Grid container spacing="3">
											<Grid item lg={12} md={12} sm={12} xs={12}>
												<Button
													variant="outlined"
													onClick={() => navigate("#reserve")}
												>
													Reservar
												</Button>
											</Grid>
										</Grid>
									</Grid>
								) : (<></>)}

								<Grid item xs={12}>
									<Grid container spacing="3">
										<Grid item lg={12} md={12} sm={12} xs={12}>
											<Typography> Comentarios</Typography>
											<hr></hr>
										</Grid>
									</Grid>
								</Grid>

								{user ? (
									<Grid item xs={12}>
										<Grid container spacing="3">
											<Grid item lg={12} md={12} sm={12} xs={12}>
												<Button
													variant="outlined"
													onClick={() => navigate("#rating")}
												>
													Calificar parqueadero
												</Button>
											</Grid>
										</Grid>
									</Grid>
								) : (<></>)}

								<Grid item xs={12}>
									<Grid container spacing="50">
										<Grid item lg={3} md={4} sm={4} xs={12}>
											<Avatar style={{ top: "50%", left: "50%" }}>A</Avatar>
										</Grid>
										<Grid item lg={9} md={8} sm={8} xs={12}>
											<Typography>Nombre del usuario</Typography>
											<Rating
												name="Rating Parking Lot"
												defaultValue={2.5}
												precision={0.5}
												{...formProps("ratingParkingLot")}
											/>
											<Typography>Comentario del usuario</Typography>
											<hr></hr>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<Grid container spacing="50">
										<Grid item lg={3} md={4} sm={4} xs={12}>
											<Avatar style={{ top: "50%", left: "50%" }}>A</Avatar>
										</Grid>
										<Grid item lg={9} md={8} sm={8} xs={12}>
											<Typography>Nombre del usuario</Typography>
											<Rating
												name="Rating Parking Lot"
												defaultValue={2.5}
												precision={0.5}
												{...formProps("ratingParkingLot")}
											/>
											<Typography>Comentario del usuario</Typography>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</Popup>
				</Marker>
			))}
			<Modal open={modal === "rating" || modal === "reserve"} onClose={() => navigate("#")}>
				<Box maxWidth="sm" margin="auto" marginTop="2rem">
					{modal === "rating" && <ParkingRating />}
					{modal === "reserve" && <ReserveConfirm/>}
				</Box>
			</Modal>
		</MapContainer>
	);
};

export default Map;
