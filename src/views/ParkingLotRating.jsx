import { Box, Container } from "@mui/material";
import RatingParkingLot from "../components/rating/RatingParkingLot";

const ParkingLotRating = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<RatingParkingLot />
			</Box>
		</Container>
	);
};

export default ParkingLotRating;
