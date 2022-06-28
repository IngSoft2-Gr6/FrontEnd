import {
	Box,
	Button,
	Container,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const TimeInParking = () => {
	const { user, realTime, toggleTimer, timer } = useContext(UserContext);
	const [userInfo, setUserInfo] = useState({});
	const [parking, setParking] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		setParking(JSON.parse(localStorage.getItem("actualParking")));
	}, [user]);

	return (
		<Container maxWidth="sm">
			<Box sx={{ my: "5rem" }}>
				<Typography
					variant="h4"
					color="textPrimary"
					align="center"
					gutterBottom
				>
					Parking time
				</Typography>

				<Typography
					mt={6}
					mb={3}
					align="center"
					color={user.verified ? "success.main" : "error.main"}
				>
					You are currently in {parking?.name}
				</Typography>
				<List style={{ backgroundColor: "background.paper" }}>
					<ListItem key="Name" divider>
						<ListItemText
							primary="Fee"
							secondary="The fee of our parking lot is as follows"
							sx={{ color: "text.primary", fontWeight: "bold" }}
						/>{" "}
						<Typography sx={{ color: "text.primary", fontWeight: "bold" }}>
							{parking?.fee} per {parking?.feePer}
						</Typography>
					</ListItem>
					<ListItem key="Time" divider>
						<ListItemText
							primary="Total parking time"
							secondary="This is the total time you have been in our parking lot"
							sx={{ color: "text.primary", fontWeight: "bold" }}
						/>
						<Typography sx={{ color: "text.primary", fontWeight: "bold" }}>
							{`${realTime} hh/mm/ss`}
						</Typography>
					</ListItem>
				</List>
				<Button
					variant="contained"
					fullWidth
					onClick={() => {
						toggleTimer();
						navigate("/home");
					}}
				>
					finish parking time
				</Button>
			</Box>
		</Container>
	);
};

export default TimeInParking;
