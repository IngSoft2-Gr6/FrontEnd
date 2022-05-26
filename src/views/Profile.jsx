import API from "../config/axios";
import { useState, useEffect } from "react";
import { List, ListItem, ListItemText, styled } from "@mui/material";

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

	// style information for text like "Your Profile is not verified"
	const Info = styled("div")({
		fontSize: "1.5rem",
		marginBottom: "1rem",
		textAlign: "center",
	});

	return (
		<div>
			<div style={{ width: "30rem", margin: "0 auto" }}>
				<h1 style={{ textAlign: "center" }}>Your Profile</h1>

				{verified ? (
					<Info style={{ color: "#00ff00" }}>Your Profile is verified.</Info>
				) : (
					<Info style={{ color: "#ff0000" }}>
						Your Profile is not verified
						<br />
						Please check your email: <strong>{user.email}</strong> to verify
						your account.
					</Info>
				)}
				<List>
					{Object.keys(user).map((key) =>
						// if key is an array, render it as a list of roles
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
			</div>
		</div>
	);
};

export default Profile;
