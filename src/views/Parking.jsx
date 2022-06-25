import { Box, Container } from "@mui/material";
import ParkingsLot from "../components/parking/ParkingsLot";

const Parking = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<ParkingsLot />
			</Box>
		</Container>
	);
};

export default Parking;
