import { Box, Container } from "@mui/material";
import RegisterParking from "../components/parking/RegisterParking";

const NewParking = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<RegisterParking />
			</Box>
		</Container>
	);
};

export default NewParking;
