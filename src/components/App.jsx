import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";

import Nav from "./Nav";
import VerifyAccount from "./VerifyAccount";

import { Home, Login, Profile, Signup } from "../views";
import { Container, ThemeProvider, createTheme } from "@mui/material";

const App = () => {
	const paths = [
		{ label: "Home", href: "/home" },
		{ label: "Login", href: "/users/login" },
		{ label: "Signup", href: "/users/signup" },
		{ label: "profile", href: "/users/profile" },
	];

	const darkTheme = createTheme({
		palette: {
			mode: "light",
		},
	});

	return (
		<ThemeProvider theme={darkTheme}>
			<Container
			// style={{ backgroundColor: "#424242", height: "100vh", width: "100vw" }}
			>
				<Router>
					<Nav paths={paths} />
					<Routes>
						<Route path="/home" element={<Home />} />
						<Route path="/users/login" element={<Login />} />
						<Route path="/users/signup" element={<Signup />} />
						<Route path="/users/profile" element={<Profile />} />
						<Route path="/users/verify/account" element={<VerifyAccount />} />
						<Route path="*" element={<Navigate to="/home" />} />
					</Routes>
				</Router>
			</Container>
		</ThemeProvider>
	);
};

export default App;
