import { Box, Container } from "@mui/material";
import BusinessHoursUpdate from "../components/parking/BusinessHoursUpdate";

const BusinessHours = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<BusinessHoursUpdate />
			</Box>
		</Container>
	);
};

export default BusinessHours;
