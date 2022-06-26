import { Box, Container } from "@mui/material";
import Confirmreserve from "../components/reserve/ConfirmReserve";

const ReserveConfirm = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<Confirmreserve />
			</Box>
		</Container>
	);
};

export default ReserveConfirm;