import { Box, Container } from "@mui/material";
import CarInfo from "../components/viewsInformation/CarInfo";

const CarsInfo = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<CarInfo />
			</Box>
		</Container>
	);
};

export default CarsInfo;
