import { Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

const ParkingHistory = () => {
	const [realTime, setRealTime] = useState(false);
	const [parkingHistory, setParkingHistory] = useState({});

	useEffect(() => {
		const now = new Date();
		const parkingHistory = JSON.parse(localStorage.getItem("parkingHistory"));
		setParkingHistory(parkingHistory);

		if (parkingHistory.parkingEndTime) return;

		const parkingStartTime = new Date(parkingHistory.parkingStartTime);
		const duration = now.getTime() - parkingStartTime.getTime();
		setInterval(() => {
			const hours = Math.floor(duration / (1000 * 60 * 60));
			const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((duration % (1000 * 60)) / 1000);
			const realTime = `${hours < 10 ? `0${hours}` : hours}:${
				minutes < 10 ? `0${minutes}` : minutes
			}:${seconds < 10 ? `0${seconds}` : seconds}`;
			setRealTime(realTime);
		}, 1000);
	}, [realTime]);

	return (
		<Paper elevation={24} style={{ padding: "1rem", borderRadius: "1rem" }}>
			<Typography align="center" variant="h5">
				Parking History
			</Typography>
			{!parkingHistory?.amountToBePaid && (
				<Typography align="center" variant="h6">
					You have parked for {realTime}
				</Typography>
			)}
			{/* Value to pay			 */}
			{parkingHistory?.amountToBePaid && (
				<Typography variant="h6">
					Value to pay: ${parkingHistory?.amountToBePaid || 0}
				</Typography>
			)}
		</Paper>
	);
};

export default ParkingHistory;
