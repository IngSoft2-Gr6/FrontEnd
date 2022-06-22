import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";

import Menu from "./layout/Menu";
import ResponsiveAppBar from "./layout/Appbar";

import { Home, Login, Profile, Signup } from "../views";
import { Switch, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { VerifyAccount, PasswordReset } from "./auth";
import { UserProvider } from "../context/UserContext";
import { getTheme, toggleTheme } from "./theme";
import { DarkMode, LightMode } from "@mui/icons-material";

const App = () => {
	const [theme, setTheme] = useState(getTheme());

	useEffect(() => {
		document.body.style.backgroundColor = theme.palette.background.default;
	}, [theme]);

	

	return (
		<ThemeProvider theme={theme}>
			<UserProvider>
			
				<div style={{ height: "100vh", width: "100vw" }}>
				
					<Router >
						<ResponsiveAppBar/>
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
									<Route path="profile" element={<Profile />} />
									<Route path="verify/account" element={<VerifyAccount />} />
									<Route path="password/reset" element={<PasswordReset />} />
								</Route>
							</Route>
							<Route path="*" element={<Navigate to="/home" />} />
						</Routes>
					</Router>
				</div>
				<div
					style={{
						position: "fixed",
						bottom: 0,
						width: "100%",
						zIndex: "1000",
					}}
				>
					
					<Switch
						onChange={() => setTheme(toggleTheme(theme))}
						checked={theme.palette.mode === "dark"}
						icon={<LightMode color="primary" style={{ margin: "-2px" }} />}
						checkedIcon={
							<DarkMode color="primary" style={{ margin: "-2px" }} />
						}
					/>
				</div>
			</UserProvider>
		</ThemeProvider>
	);
};

export default App;
