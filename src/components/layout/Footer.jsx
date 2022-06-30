import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Container, Link, Toolbar, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { styled } from "@mui/material/styles";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import IconButton from "@mui/material/IconButton";
import Fingerprint from "@mui/icons-material/Fingerprint";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu } from "@mui/material";
import { MenuItem } from "@mui/material";
import { Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import GroupsIcon from "@mui/icons-material/Groups";
import QuizIcon from "@mui/icons-material/Quiz";

const Footers = styled("footer")(({ theme }) => ({
	position: "fixed",
	zIndex: "1001",
	bottom: "0px",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.background.default,
	width: "100%",
	color: theme.palette.text.primary,
}));

const Footer = () => {
	const navigate = useNavigate();
	const [anchorElNav, setAnchorElNav] = useState(null);

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};

	function handleCloseMenu(page) {
		setAnchorElNav(null);
		navigate(page);
	}

	return (
		<Footers>
			<Container maxWidth="xl">
				<Toolbar>
					<DirectionsCarIcon sx={{ mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/home"
						sx={{
							mr: 2,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						SPARKING
					</Typography>

					<Box
						sx={{
							right: "0",
							position: "absolute",
							display: { md: "flex", xs: "none" },
						}}
					>
						<Stack
							sx={{ display: { md: "flex", xs: "none" } }}
							spacing={4}
							direction="row"
						>
							<Link
								href="https://www.instagram.com/sparking.oficial/"
								zIndex={1}
							>
								<IconButton aria-label="Instagram">
									<InstagramIcon />
								</IconButton>
							</Link>
							<Link href="https://twitter.com/sparking_694" zIndex={1}>
								<IconButton aria-label="Twitter">
									<TwitterIcon />
								</IconButton>
							</Link>
							<Link
								href="https://drive.google.com/file/d/12Psmi4btB9-VU5dMl5Rm0zBDXneqZ5k0/view"
								zIndex={1}
							>
								<IconButton aria-label="fingerprint">
									<Fingerprint />
								</IconButton>
							</Link>
						</Stack>
						<Button
							zIndex={1}
							key="about"
							onClick={() => navigate("/about")}
							sx={{
								ml: 2,
								color: "inherit",
								display: { md: "flex", xs: "none" },
							}}
						>
							About us
						</Button>

						<Button
							key="FAQ"
							onClick={() => navigate("/frequently-asked-questions")}
							sx={{
								color: "inherit",
								display: { md: "flex", xs: "none" },
							}}
						>
							FAQ
						</Button>
					</Box>

					<Box
						sx={{
							flexGrow: 0,
							right: "0",
							position: "absolute",
							display: { xs: "flex", md: "none" },
						}}
					>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
							zIndex={1}
						>
							<MenuItem
								key="instagram"
								onClick={() =>
									window.location.replace(
										"https://www.instagram.com/sparking.oficial/"
									)
								}
							>
								<InstagramIcon />
								<Typography ml="7px" textAlign="center">
									Instagram
								</Typography>
							</MenuItem>
							<MenuItem
								key="twitter"
								onClick={() =>
									window.location.replace("https://twitter.com/sparking_694")
								}
							>
								<TwitterIcon />
								<Typography ml="7px" textAlign="center">
									Twitter
								</Typography>
							</MenuItem>
							<MenuItem
								key="Legal"
								onClick={() =>
									window.location.replace(
										"https://drive.google.com/file/d/12Psmi4btB9-VU5dMl5Rm0zBDXneqZ5k0/view"
									)
								}
							>
								<Fingerprint />
								<Typography ml="7px" textAlign="center">
									Legal
								</Typography>
							</MenuItem>
							<MenuItem
								key="About us"
								onClick={() => handleCloseMenu("/about")}
							>
								<GroupsIcon />
								<Typography ml="7px" textAlign="center">
									About us
								</Typography>
							</MenuItem>
							<MenuItem
								key="FAQ"
								onClick={() => handleCloseMenu("/frequently-asked-questions")}
							>
								<QuizIcon />
								<Typography ml="7px" textAlign="center">
									FAQ
								</Typography>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</Footers>
	);
};

export default Footer;
