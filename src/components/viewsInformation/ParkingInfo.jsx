import { useState, useEffect, useContext } from "react";
import {
	Box,
	Button,
	Container,
	Card,
	CardActions,
	CardContent,
	Typography,
} from "@mui/material";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const ParkingInfo = () => {
	const { parkings, getParkings } = useContext(UserContext);
	const [parkingsInfo, setparkingsInfo] = useState([]);

	const navigate = useNavigate();

	useEffect(() => {
		getParkings();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	//get parking data from API when component mounts
	useEffect(() => {
		if (!parkings) return;
		const userparkings = parkings.map((v) => {
			return {
				Id: v.id,
				Name: v.name,
				Description: v.description,
				Address: v.address,
				Fee: v.fee,
				FeePer: v.feePer,
				MinFee: v.minFee,
				Capacity: v.capacity,
			};
		});
		setparkingsInfo(userparkings);
	}, [parkings]);

	return (
		<Container maxWidth="sm">
			<Box my={4}>
				{parkingsInfo && (
					<>
						<br />
						<br />
						<Typography
							variant="h4"
							color="textPrimary"
							align="center"
							gutterBottom
						>
							Welcome, these are your parkings!
						</Typography>
						{parkingsInfo.map((v) => {
							return (
								<Card sx={{ minWidth: 275 }} key={v.Id}>
									<CardContent>
										<Typography
											sx={{ fontSize: 14 }}
											color="text.secondary"
											gutterBottom
										>
											{v.Name}
										</Typography>
										<Typography variant="h5" component="div">
											{v.Description}
										</Typography>
										<Typography sx={{ mb: 1.5 }} color="text.secondary">
											{v.Address}
										</Typography>
										<Typography variant="body2">
											Fee: {v.Fee}
											<br />
											Fee Per: {v.FeePer}
											<br />
											Min Fee: {v.MinFee}
											<br />
											Capacity: {v.Capacity}
										</Typography>
									</CardContent>
									<CardActions>
										<Button
											variant="contained"
											fullWidth
											onClick={() => {
												console.log("clicked");
												navigate(`?parkingLotId=${v.Id}#qrcode`);
											}}
										>
											Generate QR Code
										</Button>
										<Button
											variant="contained"
											fullWidth
											onClick={() => {
												console.log("clicked");
												navigate("/parking/update");
											}}
										>
											Update ParkingInfo
										</Button>
									</CardActions>
								</Card>
							);
						})}
						;
					</>
				)}
				<br />
				<Button
					variant="contained"
					fullWidth
					onClick={() => {
						console.log("clicked");
						navigate("#newParking");
					}}
				>
					Add parking
				</Button>
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
				<br />
			</Box>
		</Container>
	);
};

export default ParkingInfo;
