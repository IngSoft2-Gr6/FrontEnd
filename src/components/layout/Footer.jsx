import { Box, Button, Container, Toolbar, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

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

	return (
		<Footers>
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					<DirectionsCarIcon sx={{ mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/home"
						sx={{
							mr: 2,
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						SPARKING
					</Typography>
					<Box sx={{ flexGrow: 0, display: "flex" }}>
						<Button
							key="info"
							onClick={() =>
								navigate("https://github.com/IngSoft2-Gr6/FrontEnd#login")
							}
							sx={{ my: 2, ml: 2, display: "block" }}
						>
							Sobre nosotros
						</Button>
						<Button
							key="signup"
							onClick={() => navigate("#signup")}
							sx={{ my: 2, display: "block" }}
						>
							Informacion legal
						</Button>
					</Box>
				</Toolbar>
			</Container>
		</Footers>
	);
};

export default Footer;
