import { AccountCircle, Logout, Map } from "@mui/icons-material";
import {
	Avatar,
	Box,
	Button,
	IconButton,
	Menu as MuiMenu,
	MenuItem,
} from "@mui/material";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Menu = () => {
	const { user, logout } = useContext(UserContext);
	const [anchorEl, setAnchorEl] = useState(null);
	const navigate = useNavigate();
	const open = Boolean(anchorEl);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	// button style
	const buttonStyle = {
		sx: { m: "0.5rem", p: "0.5rem 1rem" },
		variant: "contained",
	};

	return (
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
								color: "primary.contrast",
								backgroundColor: "primary.main",
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
					<Button component={Link} to="/users/login" {...buttonStyle}>
						Login
					</Button>
					<Button component={Link} to="/users/signup" {...buttonStyle}>
						Signup
					</Button>
				</>
			)}
		</Box>
	);
};

export default Menu;
