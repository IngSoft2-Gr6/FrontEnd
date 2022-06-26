import { Box, Container } from "@mui/material";
import RatingDriver from "../components/rating/RatingDriver";

const DriverRating = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<RatingDriver />
			</Box>
		</Container>
	);
};

export default DriverRating;
