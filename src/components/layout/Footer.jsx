import { Container, Toolbar, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
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
				</Toolbar>
			</Container>
		</Footers>
	);
};

export default Footer;
