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

const Menu = () => {
	const { user, logout } = useContext(UserContext);
	const [modal, setModal] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
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
		setModal(!user && location.hash.replace("#", ""));
	}, [user, location]);

	// button style
	const buttonStyle = {
		sx: { m: "0.5rem", p: "0.5rem 1rem" },
		variant: "contained",
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
				open={modal === "login" || modal === "signup"}
				onClose={() => navigate("#")}
			>
				<Box maxWidth="sm" margin="auto" marginTop="2rem">
					{modal === "login" && <LoginForm />}
					{modal === "signup" && <SignupForm />}
				</Box>
			</Modal>
		</>
	);
};

export default Menu;
