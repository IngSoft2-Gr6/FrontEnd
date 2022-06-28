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

const Profile = () => {
	const { user } = useContext(UserContext);
	const [userInfo, setUserInfo] = useState({});
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) return;
		const formattedUser = {
			Name: user.name,
			Email: user.email,
			"Date Joined": new Date(user.createdAt).toLocaleDateString(),
			"Identity Card Type": user.identityCardType,
			"Identity Card": user.identityCard,
			"Phone Number": user.phone,
			Roles: user.roles?.map((role) => role.name),
		};
		setUserInfo(formattedUser);
	}, [user]);

	return (
		<Container maxWidth="sm">
			<Box sx={{ my: "5rem" }}>
				{userInfo && user && (
					<>
						<Typography
							variant="h4"
							color="textPrimary"
							align="center"
							gutterBottom
						>
							Welcome, {userInfo.Name}
						</Typography>

						<Typography
							mt={6}
							mb={3}
							align="center"
							color={user.verified ? "success.main" : "error.main"}
						>
							{user.verified
								? "Your profile is verified"
								: "Your profile is not verified please check your email for verification link"}
						</Typography>
						<List style={{ backgroundColor: "background.paper" }}>
							{Object.keys(userInfo).map((key) =>
								// if key is an array, render it joined by commas
								Array.isArray(userInfo[key]) ? (
									<ListItem key={key} divider>
										{/* //set colors for list item text both primary and secondary */}
										<ListItemText
											primary={key}
											secondary={userInfo[key].join(", ")}
											sx={{ color: "text.primary", fontWeight: "bold" }}
										/>
									</ListItem>
								) : (
									<ListItem key={key} divider>
										<ListItemText
											primary={key}
											secondary={userInfo[key]}
											sx={{ color: "text.primary", fontWeight: "bold" }}
										/>
									</ListItem>
								)
							)}
						</List>
					</>
				)}
				<Button
					variant="contained"
					fullWidth
					onClick={() => {
						console.log("clicked");
						navigate("#updateProfile");
					}}
				>
					Update
				</Button>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
				<br></br>
			</Box>
		</Container>
	);
};

export default Profile;
