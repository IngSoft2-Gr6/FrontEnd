import {
	Button,
	Card,
	CardContent,
	CardActions,
	Typography,
	Container,
	Box,
} from "@mui/material";
import API from "../../config/axios";
import { until } from "../../helpers/until";
import { useState } from "react";
import { useEffect } from "react";

const ParkingsLot = () => {
	const [parkingsLots, setParkingsLot] = useState({});
	const [error, setError] = useState("");
	useEffect(() => {
		const parkingsLots = localStorage.getItem("parkings");
		if (parkingsLots) setParkingsLot(JSON.parse(parkingsLots));
		if (parkingsLots) return;
		(async () => {
			const [err, res] = await until(API.get("parking/"));
			if (err) return setError(err.response.data.message);
			// set parking in local storage
			localStorage.setParking(
				"parking",
				JSON.stringify({
					Name: res.data.data.name,
					Description: res.data.data.description,
					Address: res.data.data.address,
					Capacity: res.data.data.capacity,
					Fee: res.data.data.fee,
					KeyNeeded: res.data.data.keyNeeded,
				})
			);
		})();
	}, []);
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<>
					<Typography
						variant="h4"
						color="textPrimary"
						align="center"
						gutterBottom
					>
						Welcome, your parkingsLots!
					</Typography>
					<Typography variant="body2" color="textPrimary">
						{error}
					</Typography>
				</>
				{parkingsLots.map((parking) => (
					<Card sx={{ minWidth: 275 }}>
						<CardContent>
							<Typography
								sx={{ fontSize: 14 }}
								color="text.secondary"
								gutterBottom
							>
								{parking.Name}
							</Typography>
							<Typography variant="h5" component="div">
								{parking.Address}
							</Typography>
							<Typography sx={{ mb: 1.5 }} color="text.secondary">
								{parking.Description}
							</Typography>
							<Typography variant="body2">
								Fee: {parking.Fee}
								<br />
								Capacity: {parking.Capacity}
							</Typography>
						</CardContent>
						<CardActions>
							<Button size="small">Administrate</Button>
						</CardActions>
					</Card>
				))}
			</Box>
		</Container>
	);
};
export default ParkingsLot;
