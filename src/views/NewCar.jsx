import { Box, Container } from "@mui/material";
import RegisterVehicle from "../components/Driver/registerVehicle";

const NewCar = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<RegisterVehicle />
			</Box>
		</Container>
	);
};

export default NewCar;
