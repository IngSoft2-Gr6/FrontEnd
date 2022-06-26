import { Box, Container } from "@mui/material";
import ConfirmReserve from "../components/reserve/ConfirmReserves";

const ReserveConfirm = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<ConfirmReserve />
			</Box>
		</Container>
	);
};

export default ReserveConfirm;