import { Box, Container, Typography } from "@mui/material";

const Home = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<Typography
					variant="h4"
					component="h1"
					align="center"
					gutterBottom
					color="textPrimary"
				>
					Home
				</Typography>
				<Typography mt={6} mb={3} align="center" color="textSecondary">
					Welcome to the home page of SParking!
				</Typography>
			</Box>
		</Container>
	);
};

export default Home;
