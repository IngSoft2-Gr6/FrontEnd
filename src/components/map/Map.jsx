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
import ReserveConfirm from "../../views/ReserveConfirms";
import { UserContext } from "../../context/UserContext";
import Rating from "@mui/material/Rating";
import { until } from "../../helpers/until";

const Map = ({ theme }) => {
	const { user } = useContext(UserContext);
	const [parkings, setParkings] = useState([]);
	const [modal, setModal] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const colorMap = () => {
		const mode = localStorage.getItem("theme");
		if (mode === "dark") {
			return "https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png";
		} else {
			return "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
		}
	};

	const Parkings = async () => {
		const [err, res] = await until(API.get("/parkingLots"));
		if (err) return;
		if (!res) return;
		setParkings(res.data.data);
	};

	const RatingParking = (parkingLotId) => {
		localStorage.setItem("parkingLotId", parkingLotId);
		console.log(localStorage.getItem("parkingLotId"));
		navigate("#rating");
	};

	const ReserveParking = (parking) => {
		localStorage.setItem("actualParking", JSON.stringify(parking));
		navigate("#reserve");
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
				url={colorMap()}
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
													top: "20%",
													width: "50px",
													height: "50px",
													backgroundColor: "orange",
												}}
											>
												{parking.name.charAt(0)}{" "}
											</Avatar>
										</Grid>
										<Grid item lg={9} md={8} sm={8} xs={12}>
											<Typography variant="h6">{parking.name}</Typography>
											<Typography>{parking.address}</Typography>
											<Rating
												name="Rating Parking Lot"
												defaultValue={2.5}
												precision={0.5}
												readOnly
											/>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<Grid container>
										<Grid
											item
											lg={4}
											md={4}
											sm={4}
											xs={0}
											justify="center"
										></Grid>
										<Grid item lg={4} md={4} sm={4} xs={4} justify="center">
											<Avatar
												style={{
													backgroundColor: "#82b3c9",
												}}
											>
												<Typography>{parking.fee}</Typography>
											</Avatar>
											Fee
										</Grid>
										<Grid item lg={4} md={4} sm={4} xs={4}>
											<Avatar
												style={{
													backgroundColor: "#82b3c9",
												}}
											>
												<Typography>{parking.capacity}</Typography>
											</Avatar>
											Capacity
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
													onClick={() => ReserveParking(parking)}
												>
													Reserve
												</Button>
											</Grid>
										</Grid>
									</Grid>
								) : (
									<></>
								)}

								<Grid item xs={12}>
									<Grid container spacing="3">
										<Grid item lg={12} md={12} sm={12} xs={12}>
											<Typography style={{ margin: "0px" }}>
												{" "}
												Comments
											</Typography>
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
													onClick={() => RatingParking(parking.id)}
												>
													qualify parking
												</Button>
											</Grid>
										</Grid>
									</Grid>
								) : (
									<></>
								)}

								<Grid item xs={12}>
									<Grid container spacing="50">
										<Grid item lg={3} md={3} sm={3} xs={3}>
											<Avatar style={{ left: "50%" }}>A</Avatar>
										</Grid>
										<Grid item lg={9} md={9} sm={9} xs={9}>
											<Typography variant="h7">Nombre del usuario</Typography>
											<Rating
												name="Rating Parking Lot"
												defaultValue={2.5}
												precision={0.5}
												readOnly
											/>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<Grid container spacing="">
										<Grid item lg={12} md={12} sm={12} xs={12}>
											<Typography style={{ margin: "0px" }}>
												Comentario del usuario
											</Typography>
											<hr size="1"></hr>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<Grid container spacing="50">
										<Grid item lg={3} md={3} sm={3} xs={3}>
											<Avatar style={{ left: "50%" }}>A</Avatar>
										</Grid>
										<Grid item lg={9} md={9} sm={9} xs={9}>
											<Typography variant="h7">Nombre del usuario</Typography>
											<Rating
												name="Rating Parking Lot"
												defaultValue={2.5}
												precision={0.5}
												readOnly
											/>
										</Grid>
									</Grid>
								</Grid>

								<Grid item xs={12}>
									<Grid container>
										<Grid item lg={12} md={12} sm={12} xs={12}>
											<Typography style={{ margin: "0px" }}>
												Comentario del usuario
											</Typography>
											<hr size="1"></hr>
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Paper>
					</Popup>
				</Marker>
			))}
			<Modal
				open={modal === "rating" || modal === "reserve"}
				onClose={() => navigate("#")}
			>
				<Box maxWidth="sm" margin="auto" marginTop="2rem">
					{modal === "rating" && <ParkingRating />}
					{modal === "reserve" && <ReserveConfirm />}
				</Box>
			</Modal>
		</MapContainer>
	);
};

export default Map;
