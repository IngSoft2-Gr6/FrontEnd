import { Box, Container } from "@mui/material";
import UpdateParking from "../components/parking/UpdateParking";

const ParkingUpdate = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<UpdateParking />
			</Box>
		</Container>
	);
};

export default ParkingUpdate;
