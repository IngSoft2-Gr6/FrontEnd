import {
	AppBar,
	Avatar,
	Box,
	Button,
	Container,
	IconButton,
	Modal,
	Menu,
	MenuItem,
	Toolbar,
	Tooltip,
	Typography,
} from "@mui/material";
import { AccountCircle, Logout } from "@mui/icons-material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation, useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";

const Footers = styled("footer")(({ theme }) => ({
	position:"fixed",
  zIndex: "1001",
  bottom:"0px",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: theme.palette.background.default,
	width:"100%",
  color: theme.palette.text.primary
}));


const Footer= () =>{


  const navigate = useNavigate();


  return(
    <Footers>
			<Container maxWidth="xl" >
				<Toolbar disableGutters>
					<DirectionsCarIcon
						sx={{ mr: 1}}
					/>
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
							key="login"
							onClick={() => navigate("#login")}
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
}

export default Footer;
