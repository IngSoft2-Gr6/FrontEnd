import {
	BrowserRouter as Router,
	Navigate,
	Route,
	Routes,
} from "react-router-dom";

import Menu from "./layout/Menu";

import { Home, Profile } from "../views";
import { Switch, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { UserProvider } from "../context/UserContext";
import { getTheme, toggleTheme } from "./theme";
import { DarkMode, LightMode } from "@mui/icons-material";
import { VerifyAccount, PasswordReset } from "./auth";
import NewParking from "../views/NewParking";
import Parking from "../views/Parking";
import BusinessHours from "../views/BusinessHours";
import ParkingProfile from "../views/ParkingProfile";
import ParkingUpdate from "../views/ParkingUpdate";
import ParkingRating from "../views/ParkingLotRating";
import DriverRating from "../views/DriverRating";
import NewCar from "../views/NewCar";
import Footer from "./layout/Footer";
import ReserveConfirm from "../views/ReserveConfirms";
const App = () => {
	const [theme, setTheme] = useState(getTheme());

	useEffect(() => {
		document.body.style.backgroundColor = theme.palette.background.default;
	}, [theme]);

	return (
		<ThemeProvider theme={theme}>
			<UserProvider>
				<div style={{ height: "100vh", width: "100vw" }}>
					<Router>
						<Menu />
						<Footer/>
						<Routes>
							<Route exact path="/" element={<Navigate to="/home" />} />
							<Route exact path="parking" element={<Parking />} />
							<Route path="/">
								<Route path="home" element={<Home />} />
								<Route path="users">
									<Route path="profile" element={<Profile />} />
									<Route path="verify/account" element={<VerifyAccount />} />
									<Route path="password/reset" element={<PasswordReset />} />
								</Route>
							</Route>
							<Route path="parking">
								<Route path="profile" element={<ParkingProfile />} />
								<Route path="register" element={<NewParking />} />
								<Route path="businesshours" element={<BusinessHours />} />
								<Route path="update" element={<ParkingUpdate />} />
								<Route path="rating" element={<DriverRating />} />
							</Route>
							<Route path="driver">
								<Route path="rating" element={<ParkingRating />} />
								<Route path="registervehicle" element={<NewCar />} />
							</Route>
							<Route path="*" element={<Navigate to="/home" />} />
						</Routes>
						
					</Router>
				</div>
				<div
					style={{
						position: "fixed",
						bottom: 16,
						left:200,
						width: "100%",
						zIndex: "1002",
					}}
				>
					<Switch
						onChange={() => setTheme(toggleTheme(theme))}
						checked={theme.palette.mode === "dark"}
						icon={<LightMode color="primary" style={{ margin: "-2px" }} />}
						checkedIcon={
							<DarkMode color="primary" style={{ margin: "-2px"}} />
						}
					/>
				</div>
			</UserProvider>
		</ThemeProvider>
	);
};

export default App;
