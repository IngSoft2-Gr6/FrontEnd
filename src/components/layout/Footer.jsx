import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Container, Link, Toolbar, Typography } from "@mui/material";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import { styled } from "@mui/material/styles";
import InstagramIcon from '@mui/icons-material/Instagram';	
import TwitterIcon from '@mui/icons-material/Twitter';
import IconButton from '@mui/material/IconButton';
import Fingerprint from '@mui/icons-material/Fingerprint';

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
				<Toolbar>

					<DirectionsCarIcon sx={{ mr: 1 }} />
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/home"
						sx={{
							mr:2,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						SPARKING
					</Typography>
					<Stack sx={{display:{md : "flex"}}} spacing={4} direction="row">
				<Link href="https://www.instagram.com/sparking.oficial/" zIndex={1} left="67%" top="20%" position="absolute">
					<IconButton aria-label="Instagram" >
        		<InstagramIcon />
      		</IconButton>
				</Link>
				<Link href="https://twitter.com/sparking_694" zIndex={1}  left="55%"  top="20%" position="absolute">
      		<IconButton aria-label="Twitter"  >
        		<TwitterIcon />
      		</IconButton>
					</Link>
					<Link  href="https://drive.google.com/file/d/12Psmi4btB9-VU5dMl5Rm0zBDXneqZ5k0/view" zIndex={1}  left="45%"  top="20%" position="absolute">
      		<IconButton aria-label="fingerprint"  >
        		<Fingerprint />
      		</IconButton>
					</Link>
    		</Stack>
				</Toolbar>
			</Container>
		</Footers>
	);
};


export default Footer;