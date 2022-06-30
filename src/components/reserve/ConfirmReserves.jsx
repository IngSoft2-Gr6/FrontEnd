import { Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ConfirmReserve = () => {
	const parkingId = JSON.parse(localStorage.getItem("actualParking")).id;
	const navigate = useNavigate();

	return (
		<Paper elevation={24} style={{ padding: "1rem", borderRadius: "1rem" }}>
			<Typography>
				Do you want to make your reservation in this parking lot?
			</Typography>
			<Button
				onClick={() => {
					navigate(`/parking/${parkingId}/history`);
				}}
			>
				Accept
			</Button>
			<Button color="error">Cancel</Button>
		</Paper>
	);
};

export default ConfirmReserve;
