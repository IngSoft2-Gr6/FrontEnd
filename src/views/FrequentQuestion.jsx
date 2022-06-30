import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";

const FrequentQuestion = () => {
	return (
		<Container maxWidth="sm" align="center">
			<Box sx={{ my: "5rem" }}>
				<Typography align="center" variant="h4" sx={{ color: "text.primary" }}>
					Frequent Questions
				</Typography>
				<br />
				<Card sx={{ maxWidth: 345 }}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							Is it safe to make a reservation through the site?
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Yes, it is totally safe, the parking lot sets aside your place,
							and at the time of your arrival the place that is set aside for
							you, the parking lot must indicate it to you.
						</Typography>
					</CardContent>
				</Card>
				<br />
				<Card sx={{ maxWidth: 345 }}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							Is it safe to accept reservations through the website?
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Yes, it is totally safe, this is because when a driver makes a
							reservation, you as a parking lot are given the information such
							as name, license plate of the vehicle, to be sure that the vehicle
							that arrives is the one that made the reservation.
						</Typography>
					</CardContent>
				</Card>
				<br />
				<Card sx={{ maxWidth: 345 }}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							Is it difficult to register as a driver and add my first vehicle?
						</Typography>
						<Typography variant="body2" color="text.secondary">
							No, it is very simple, when you register you just have to put that
							you are a driver, then when you log in, in the buttons is the one
							to add vehicle, and with that you put the license plate and the
							year of the model is enough.
						</Typography>
					</CardContent>
				</Card>
				<br />
				<Card sx={{ maxWidth: 345 }}>
					<CardContent>
						<Typography gutterBottom variant="h5" component="div">
							Registering as a parker and adding my first parker is difficult?
						</Typography>
						<Typography variant="body2" color="text.secondary">
							No, it is very simple, when you register you only have to put that
							you are a parking owner, then when you log in, in the buttons you
							will have the one to add parking, where you will fill the basic
							data necessary to make your parking visible on the page.
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

export default FrequentQuestion;
