import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";

import Nav from "./Nav";
import VerifyAccount from "./VerifyAccount";

import { Home, Login, Profile, Signup } from "../views";
import { ThemeProvider, Switch } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { getTheme, toggleTheme } from "../theme";
import { useEffect, useState } from "react";
import Logout from "./Logout";

const App = () => {
	const paths = [{ label: "Home", href: "/home" }];

	const [theme, setTheme] = useState(getTheme());

	useEffect(() => {
		document.body.style.backgroundColor = theme.palette.background.default;
	}, [theme]);

	return (
		<ThemeProvider theme={theme}>
			<div style={{ height: "100vh", width: "100vw" }}>
				<Router>
					<Nav paths={paths} />
					<Routes>
						<Route exact path="/" element={<Navigate to="/home" />} />
						<Route
							exact
							path="/users"
							element={<Navigate to="/users/login" />}
						/>
						<Route path="/">
							<Route path="home" element={<Home />} />
							<Route path="users">
								<Route path="login" element={<Login />} />
								<Route path="signup" element={<Signup />} />
								<Route path="logout" element={<Logout />} />
								<Route path="profile" element={<Profile />} />
								<Route path="verify/account" element={<VerifyAccount />} />
							</Route>
						</Route>
						<Route path="*" element={<Navigate to="/home" />} />
					</Routes>
				</Router>
				<div style={{ position: "fixed", bottom: 0, width: "100%" }}>
					<Switch
						onChange={() => setTheme(toggleTheme(theme))}
						checked={theme.palette.mode === "light"}
						icon={<LightMode color="primary" style={{ margin: "-2px" }} />}
						checkedIcon={
							<DarkMode color="primary" style={{ margin: "-2px" }} />
						}
					/>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default App;
