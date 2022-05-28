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

const Profile = () => {
	const [user, setUser] = useState({});
	const [verified, setVerified] = useState(false);
	const [error, setError] = useState("");

	// get user data from API when component mounts
	useEffect(() => {
		if (localStorage.getItem("loggedIn")) {
			API.get("/users/profile")
				.then((res) => {
					const {
						name,
						email,
						phone,
						photo,
						verified,
						identityCard,
						identityCardType,
						roles,
					} = res.data.data;
					const roleNames = roles.map((role) => role.name);
					setUser({
						Name: name,
						Email: email,
						Phone: phone,
						Photo: photo,
						"Idendity Card": identityCard,
						"Idendity Card Type": identityCardType,
						Roles: roleNames,
					});
					setVerified(verified);
				})
				.catch((err) => {
					// console.log(err);
					setError(err.response.data?.message || "Something went wrong");
				});
		} else {
			setError("You are not logged in");
		}
	}, []);

	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<Typography
					align="center"
					color="textPrimary"
					component="h1"
					gutterBottom
					variant="h4"
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
				<List
					style={{
						// set background color
						backgroundColor: "background.paper",
					}}
				>
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
			</Box>
		</Container>
	);
};

export default Profile;
