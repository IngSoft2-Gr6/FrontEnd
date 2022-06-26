import API from "../../config/axios";
import { useState, useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import { until } from "../../helpers/until";

const ParkingInfo = () => {
	const [parking, setParking] = useState({});
	const [error, setError] = useState("");
	const parkingLotId = "";
	// get user data from API when component mounts
	useEffect(() => {
		const parking = localStorage.getItem("parking");
		if (parking) setParking(JSON.parse(parking));
		if (parking) return;
		(async () => {
			const [err, res] = await until(API.get(`/parking/${parkingLotId}`));
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
				{parking.Name && (
					<>
						<Typography
							variant="h4"
							color="textPrimary"
							align="center"
							gutterBottom
						>
							Welcome, {parking.Name}!
						</Typography>
						<Typography variant="body2" color="textPrimary">
							{error}
						</Typography>
						<Typography mt={6}>{parking.Description}</Typography>
						<Typography mt={6}>{parking.Address}</Typography>
						<Typography mt={6}>{parking.Capacity}</Typography>
						<Typography mt={6}>{parking.Fee}</Typography>
						<Typography mt={6}>{parking.KeyNeeded}</Typography>
					</>
				)}
			</Box>
		</Container>
	);
};

export default ParkingInfo;
