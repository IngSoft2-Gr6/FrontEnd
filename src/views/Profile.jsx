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

	// get user data from API when component mounts
	useEffect(() => {
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
					"Role Names": roleNames,
				});
				setVerified(verified);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<Typography variant="h4" component="h1" gutterBottom align="center">
					Your Profile
				</Typography>
				<Typography
					mt={6}
					mb={3}
					color={verified ? "success" : "error"}
					align="center"
				>
					{verified
						? "Your profile is verified"
						: "Your profile is not verified"}
				</Typography>
				<List>
					{Object.keys(user).map((key) =>
						// if key is an array, render it joined by commas
						Array.isArray(user[key]) ? (
							<ListItem key={key}>
								<ListItemText primary={key} secondary={user[key].join(", ")} />
							</ListItem>
						) : (
							<ListItem key={key}>
								<ListItemText primary={key} secondary={user[key]} />
							</ListItem>
						)
					)}
				</List>
			</Box>
		</Container>
	);
};

export default Profile;
