import API from "../config/axios";
import { useState, useEffect } from "react";
import {
	Box,
	Container,
	List,
	ListItem,
	ListItemText,
	Typography,
} from "@mui/material";
import { until } from "../helpers/until";

const Profile = () => {
	const [user, setUser] = useState({});
	const [verified, setVerified] = useState(false);
	const [error, setError] = useState("");

	// get user data from API when component mounts
	useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) return setUser(JSON.parse(user));
		if (!localStorage.getItem("loggedIn")) return;
		(async () => {
			const [err, res] = await until(API.get("/users/profile"));
			if (err) return setError(err.response.data.message);
			const roles = res.data.data.roles.map((role) => role.name);
			// set user in local storage
			localStorage.setItem(
				"user",
				JSON.stringify({
					Name: res.data.data.name,
					Email: res.data.data.email,
					Roles: roles,
					Phone: res.data.data.phone,
					Photo: res.data.data.photo,
					"Identity Card Type": res.data.data.identityCardType,
					"Identity Card Number": res.data.data.identityCard,
				})
			);
			setVerified(res.data.data.verified);
		})();
	}, []);

	return (
		<Container maxWidth="sm">
			<Box my={4}>
				{user.Name && (
					<>
						<Typography
							variant="h4"
							color="textPrimary"
							align="center"
							gutterBottom
						>
							Welcome, {user.Name}!
						</Typography>

						<Typography
							mt={6}
							mb={3}
							align="center"
							color={verified ? "success.main" : "error.main"}
						>
							{verified
								? "Your profile is verified"
								: "Your profile is not verified please check your email for verification link"}
						</Typography>
						<Typography variant="body2" color="textPrimary">
							{error}
						</Typography>
						<List style={{ backgroundColor: "background.paper" }}>
							{Object.keys(user).map((key) =>
								// if key is an array, render it joined by commas
								Array.isArray(user[key]) ? (
									<ListItem key={key}>
										{/* //set colors for list item text both primary and secondary */}
										<ListItemText
											primary={key}
											secondary={user[key].join(", ")}
											sx={{ color: "text.primary", fontWeight: "bold" }}
										/>
									</ListItem>
								) : (
									<ListItem key={key} divider>
										<ListItemText
											primary={key}
											secondary={user[key]}
											sx={{ color: "text.primary", fontWeight: "bold" }}
										/>
									</ListItem>
								)
							)}
						</List>
					</>
				)}
			</Box>
		</Container>
	);
};

export default Profile;
