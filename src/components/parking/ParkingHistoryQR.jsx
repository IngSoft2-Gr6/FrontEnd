import {
	Box,
	Button,
	Card,
	CardContent,
	Container,
	Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../config/axios";
import { UserContext } from "../../context/UserContext";
import { until } from "../../helpers/until";

const ParkingHistoryQR = () => {
	const { setParkingHistory } = useContext(UserContext);
	const [vehicleInfo, setVehicleInfo] = useState([]);
	const [parkingInfo, setParkingInfo] = useState({});
	const [parkingState, setParkingState] = useState("");
	const parkingLotId = useParams().parkingLotId;
	const navigate = useNavigate();

	useEffect(() => {
		// get parking lot info
		const getParkingInfo = async () => {
			const [err, parkingLot] = await until(
				API.get(`/parkingLots/${parkingLotId}`)
			);
			if (err) return console.log(err);
			if (!parkingLot) return console.log("Parking lot not found");
			setParkingInfo(parkingLot.data.data);
		};

		const getVehicleInfo = async () => {
			const [err, vehicle] = await until(API.get("/vehicles"));
			if (err) return console.log(err);
			if (!vehicle) return console.log("Vehicle not found");

			const currentVehicle = vehicle.data.data[0];

			const userVehicle = {
				Id: currentVehicle.id,
				Plate: currentVehicle.plate,
				Model: currentVehicle.model,
				Type: currentVehicle.vehicleTypeId,
				Color: currentVehicle.color,
				Year: currentVehicle.year,
			};
			setVehicleInfo(userVehicle);
		};

		// get parking history
		const getParkingHistory = async () => {
			const [err, history] = await until(
				API.get(`/parkingLots/${parkingLotId}/history`)
			);
			if (err) return console.log(err);
			if (!history) return console.log("History not found");

			// check if last history has start time but not end time
			if (history.data.data.length < 1) return setParkingState("Start parking");

			const lastHistory = history.data.data[0];
			console.log("lastHistory", lastHistory);

			if (lastHistory.parkingEndTime) {
				setParkingState("Start parking");
			}
			if (lastHistory.parkingStartTime && !lastHistory.parkingEndTime) {
				setParkingState("End parking");
			}
		};

		getParkingInfo();
		getVehicleInfo();
		getParkingHistory();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const submit = async () => {
		console.log("Api call");
		const [err, res] = await until(
			API.put(`/parkingLots/${parkingLotId}/history`, {
				vehicleId: vehicleInfo.Id,
			})
		);
		if (err) return console.log(err.response.data?.message);
		if (!res) return console.log("No history found");

		setParkingHistory(res.data.data);
		localStorage.setItem("parkingHistory", JSON.stringify(res.data.data));

		navigate("/home#parkingHistory");
	};

	return (
		<Container maxWidth="sm">
			<Box my={4}>
				{vehicleInfo && parkingInfo && (
					<>
						<br />
						<br />
						<Typography
							variant="h4"
							color="textPrimary"
							align="center"
							gutterBottom
						>
							Welcome, you are in the parking lot{" "}
							<strong>{parkingInfo.name}</strong> with the vehicle:
						</Typography>
						<Card sx={{ minWidth: 275 }}>
							<CardContent>
								<Typography variant="h5" component="h2">
									Plate: {vehicleInfo.Plate}
								</Typography>
								<Typography variant="body2" component="p">
									Model: {vehicleInfo.Model}
								</Typography>
								<Typography variant="body2" component="p">
									Color: {vehicleInfo.Color}
								</Typography>
								<Typography variant="body2" component="p">
									Year: {vehicleInfo.Year}
								</Typography>
							</CardContent>
						</Card>
						<Button
							variant="contained"
							color="primary"
							onClick={submit}
							style={{ marginTop: "1rem" }}
						>
							{parkingState}
						</Button>
					</>
				)}
				<br />
				<br />
				<br />
			</Box>
		</Container>
	);
};

export default ParkingHistoryQR;
