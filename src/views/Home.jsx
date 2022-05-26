import { Paper } from "@mui/material";
import Nav from "../components/Nav";

const Home = () => {
	return (
		<div>
			<Nav />
			<div style={{ marginTop: "2rem" }}>
				<h1>Home</h1>
				<Paper style={{ padding: "1rem" }}>
					<h2>Welcome to the home page!</h2>
					{/* Talk about SParking using Lorem Ipsum */}
				</Paper>
			</div>
		</div>
	);
};

export default Home;
