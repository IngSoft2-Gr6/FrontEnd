import { Box, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import UserInfo from "../components/UserInfo";

const Profile = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	// get user from local storage
	useEffect(() => {
		setLoggedIn(localStorage.getItem("loggedIn"));
	}, []);
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				{loggedIn ? (
					<UserInfo />
				) : (
					<>
						<Typography
							variant="h4"
							component="h1"
							align="center"
							gutterBottom
							color="textPrimary"
						>
							Welcome to SParking!
						</Typography>
						<Typography mt={6} mb={3} align="center" color="textSecondary">
							Please log in to continue.
						</Typography>
					</>
				)}
			</Box>
		</Container>
	);
};

export default Profile;
