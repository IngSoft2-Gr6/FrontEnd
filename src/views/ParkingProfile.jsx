import { Box, Container } from "@mui/material";
import ParkingInfo from "../components/viewsInformation/ParkingInfo";

const ParkingProfile = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<ParkingInfo />
			</Box>
		</Container>
	);
};

export default ParkingProfile;
