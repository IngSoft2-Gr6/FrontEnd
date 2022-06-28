import { Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const ConfirmReserve = () => {
	const { toggleTimer } = useContext(UserContext);
	const navigate = useNavigate();

	return (
		<Paper elevation={24} style={{ padding: "1rem", borderRadius: "1rem" }}>
			<Typography>
				Do you want to make your reservation in this parking lot?
			</Typography>
			<Button
				onClick={() => {
					toggleTimer();
					navigate("/reserve/inparking");
				}}
			>
				Accept
			</Button>
			<Button color="error">Cancel</Button>
		</Paper>
	);
};

export default ConfirmReserve;
