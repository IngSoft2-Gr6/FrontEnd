import * as React from "react";
import { Paper, Typography, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmReserve = () => {
	const navigate = useNavigate();

	return (
		<Paper elevation={24} style={{ padding: "1rem", borderRadius: "1rem" }}>
			<Typography>
				Do you want to make your reservation in this parking lot?
			</Typography>
			<Button onClick={() => navigate("/reserve/inparking")}>Accept</Button>
			<Button color="error">Cancel</Button>
		</Paper>
	);
};

export default ConfirmReserve;
