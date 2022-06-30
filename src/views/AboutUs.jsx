import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const AboutUs = () => {
	return (
		<Container maxWidth="sm" align="center">
			<Box sx={{ my: "5rem" }}>
				<Typography align="center" variant="h4" sx={{ color: "text.primary" }}>
					About Us
				</Typography>
				<br />
				<Card sx={{ maxWidth: 345 }}>
					<CardMedia component="img" alt="profile" height="140"></CardMedia>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							David Hernandez
						</Typography>
						<Typography variant="body2" color="text.secondary">
							I am a systems engineering student, I am fullstack developer, and
							Iof this project.
							<br />
							I'm in my seventh semester, I like sports and I like to learn new
							technologies.
						</Typography>
					</CardContent>
				</Card>
				<br />
				<Card sx={{ maxWidth: 345 }}>
					<CardMedia
						component="img"
						alt="profile"
						height="140"
						image="src/img/icon.png"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							Sebastian Garnica
						</Typography>
						<Typography variant="body2" color="text.secondary">
							I am a systems engineering student, I am fullstack developer, and
							Iof this project.
							<br />
							I'm in my eighth semester, I like to learn new technologies and be
							at the forefront of development issues
						</Typography>
					</CardContent>
				</Card>
				<br />
				<Card sx={{ maxWidth: 345 }}>
					<CardMedia
						component="img"
						alt="profile"
						height="140"
						image="src/img/icon.png"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							Harrison Pinto
						</Typography>
						<Typography variant="body2" color="text.secondary">
							I am a systems engineering student, I am fullstack developer,
							andof this project.
							<br />
							I'm in my eighth semester, I like to learn new technologies and be
							at the forefront of development issues.
						</Typography>
					</CardContent>
				</Card>
				<br />
				<Card sx={{ maxWidth: 345 }}>
					<CardMedia
						component="img"
						alt="profile"
						height="140"
						image="src/img/icon.png"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							Kevin Gonzales
						</Typography>
						<Typography variant="body2" color="text.secondary">
							I am a systems engineering student, I am frontend developer of
							this project.
							<br />
							I'm in my seventh semester, I like to learn everything related to
							frontend, to be up to date with new technologies for the
							development of it.
						</Typography>
					</CardContent>
				</Card>
				<br />
				<Card sx={{ maxWidth: 345 }}>
					<CardMedia
						component="img"
						alt="profile"
						height="140"
						image="src/img/icon.png"
					/>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							Sergio Lopez
						</Typography>
						<Typography variant="body2" color="text.secondary">
							I am a systems engineering student, I am Frontend developer of
							this project.
							<br />
							I'm in my seventh semester, I like sports and I like to learn new
							technologies.
						</Typography>
					</CardContent>
				</Card>
				<br />
				<form
					action="https://www.paypal.com/donate"
					method="post"
					target="_top"
				>
					<input type="hidden" name="hosted_button_id" value="CGTK2EMSKGZGU" />
					<input
						type="image"
						src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif"
						border="0"
						name="submit"
						title="PayPal - The safer, easier way to pay online!"
						alt="Donate with PayPal button"
					/>
					<img
						alt=""
						border="0"
						src="https://www.paypal.com/en_CO/i/scr/pixel.gif"
						width="1"
						height="1"
					/>
				</form>

				<br />
				<br />
				<br />
				<br />
				<br />
			</Box>
		</Container>
	);
};

export default AboutUs;
