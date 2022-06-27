import { useState, useEffect, useContext } from "react";
import {
	Box,
	Button,
	Container,
	Card,
	CardContent,
	Typography,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const CarInfo = () => {
	const { vehicles, getVehicles } = useContext(UserContext);
	const [vehicleInfo, setVehicleInfo] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		getVehicles();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//get car data from API when component mounts
	useEffect(() => {
		if (!vehicles) return;
		const userVehicles = vehicles.map((v) => {
			return {
				Id: v.id,
				Plate: v.plate,
				Model: v.model,
				Type: v.vehicleTypeId,
				Color: v.color,
				Year: v.year,
			};
		});
		setVehicleInfo(userVehicles);
	}, [vehicles]);
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				{vehicleInfo && (
					<>
						<Typography
							variant="h4"
							color="textPrimary"
							align="center"
							gutterBottom
						>
							Welcome, these are your vehicles!
						</Typography>
						{vehicleInfo.map((v) => {
							return (
								<Card sx={{ minWidth: 275 }} key={v.Id}>
									<CardContent>
										<Typography
											sx={{ fontSize: 14 }}
											color="text.secondary"
											gutterBottom
										>
											Plate: {v.Plate}
										</Typography>
										<Typography variant="h5" component="div">
											Model: {v.Model}
										</Typography>
										<Typography sx={{ mb: 1.5 }} color="text.secondary">
											Type: {v.Type}
										</Typography>
										<Typography variant="body2">
											Color: {v.Color}
											<br />
											Year: {v.Year}
										</Typography>
									</CardContent>
								</Card>
							);
						})}
						;
					</>
				)}
				<Button
					variant="contained"
					fullWidth
					onClick={() => {
						console.log("clicked");
						navigate("#newVehicle");
					}}
				>
					Add Vehicle
				</Button>
				<br />
				<br />
				<br />
			</Box>
		</Container>
	);
};

export default CarInfo;
