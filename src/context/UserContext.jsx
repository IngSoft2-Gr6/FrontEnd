import { createContext, useEffect, useState } from "react";
import API from "../config/axios";
import { until } from "../helpers/until";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [employee, setEmployee] = useState(false);
	const [vehicles, setVehicles] = useState([]);
	const [parkings, setParkings] = useState([]);

	const getUser = async () => {
		if (!localStorage.getItem("loggedIn")) return;
		const [err, res] = await until(API.get("/users/profile"));
		if (err) return err.response.data?.message;
		setUser(res.data.data);
		return res.data.data;
	};

	const logout = async () => {
		localStorage.removeItem("loggedIn");
		setUser(null);
	};

	const getVehicles = async () => {
		const [err, res] = await until(API.get("/vehicles"));
		if (err) return err.response.data?.message;
		setVehicles(res.data.data);
		return res.data.data;
	};

	const getParkings = async () => {
		console.log("Getting parkings");
		const [err, res] = await until(API.get("/parkingLots"));
		console.log("Got parkings");
		if (err) return err.response.data?.message;
		setParkings(res.data.data);
		return res.data.data;
	};

	useEffect(() => {
		if (user) return;
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<UserContext.Provider
			value={{
				employee,
				getParkings,
				getUser,
				getVehicles,
				logout,
				parkings,
				setEmployee,
				user,
				vehicles,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
