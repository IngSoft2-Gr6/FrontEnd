import { AccountCircle, Logout, Map } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Menu as MuiMenu,
	MenuItem,
	Modal,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { LoginForm, SignupForm } from "../auth";

import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import RegisterParking from "../parking/RegisterParking";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import RegisterVehicle from "../driver/registerVehicle";
import QrCode from "../parking/QrCode";
import UpdateProfile from "../profile/updateProfile";

const Menu = () => {
	const { user, logout, setEmployee, isActiveTimer } = useContext(UserContext);
	const [modal, setModal] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [userRole, setUserRole] = useState([]);
	const location = useLocation();
	const navigate = useNavigate();
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	useEffect(() => {
		setModal(location.hash.replace("#", ""));
		if (user) setUserRole(user.roles.map((role) => role.name));
		const search = new URLSearchParams(location.search);
		if (search.has("employee")) {
			const token = search.get("token");
			if (!token) return;
			return setEmployee(token);
		}
	}, [user, location, setEmployee]);

	// button style
	const buttonStyle = {
		sx: { m: "0.5rem", p: "0.5rem 1rem" },
		variant: "contained",
		color: "primary",
	};

	return (
		<>
			<Box
				sx={{
					position: "fixed",
					top: 0,
					right: 0,
					display: "flex",
					flexDirection: "row",
					justifyContent: "flex-end",
					m: "0.5rem",
					zIndex: "1000",
				}}
			>
				{user ? (
					<>
						<IconButton onClick={handleMenu}>
							<Avatar
								sx={{
									width: "3rem",
									height: "3rem",
									color: "primary.contrast",
									bgcolor: "primary.main",
								}}
							>
								{user.name.charAt(0)}
							</Avatar>
						</IconButton>
						<MuiMenu
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
							onClick={handleClose}
						>
							<MenuItem onClick={() => navigate("/users/profile")}>
								<AccountCircle /> Profile
							</MenuItem>
							<MenuItem onClick={() => navigate("/home")}>
								<Map /> Map
							</MenuItem>
							{isActiveTimer && (
								<MenuItem onClick={() => navigate("/reserve/inparking")}>
									<AppRegistrationIcon /> Return to time in parking
								</MenuItem>
							)}

							{userRole.includes("Driver") && (
								<div>
									<MenuItem onClick={() => navigate("#newVehicle")}>
										<AppRegistrationIcon /> Register Vehicle
									</MenuItem>
									<MenuItem onClick={() => navigate("/vehicle")}>
										<DirectionsCarIcon /> Vehicles
									</MenuItem>
								</div>
							)}
							{userRole.includes("Owner") && (
								<div>
									<MenuItem onClick={() => navigate("#newParking")}>
										<AppRegistrationIcon /> Register Parking
									</MenuItem>
									<MenuItem onClick={() => navigate("/parking")}>
										<LocalParkingIcon /> Parkings
									</MenuItem>
								</div>
							)}
							{userRole.includes("Employee") && <div></div>}
							<MenuItem onClick={() => logout() && navigate("/home")}>
								<Logout /> Logout
							</MenuItem>
						</MuiMenu>
					</>
				) : (
					<>
						<Button {...buttonStyle} onClick={() => navigate("#login")}>
							Login
						</Button>
						<Button {...buttonStyle} onClick={() => navigate("#signup")}>
							Signup
						</Button>
					</>
				)}
			</Box>
			<Modal
				open={!!modal}
				onClose={() => navigate("#")}
				sx={{ overflow: "auto" }}
			>
				<Box maxWidth="sm" margin="auto" marginTop="2rem">
					{modal === "login" && <LoginForm />}
					{modal === "signup" && <SignupForm />}
					{modal === "newParking" && <RegisterParking />}
					{modal === "newVehicle" && <RegisterVehicle />}
					{modal === "qrcode" && <QrCode />}
					{modal === "updateProfile" && <UpdateProfile />}
				</Box>
			</Modal>
		</>
	);
};

export default Menu;
