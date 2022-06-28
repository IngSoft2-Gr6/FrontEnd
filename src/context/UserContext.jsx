import { createContext, useEffect, useState } from "react";
import API from "../config/axios";
import { until } from "../helpers/until";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [employee, setEmployee] = useState(false);
	const [vehicles, setVehicles] = useState([]);
	const [parkings, setParkings] = useState([]);
	const [timer, setTimer] = useState(
		parseInt(localStorage.getItem("timer")) || 0
	);
	const [isActiveTimer, setIsActiveTimer] = useState(
		localStorage.getItem("isActiveTimer") === "true"
	);
	const [realTime, setRealTime] = useState(false);

	const toggleTimer = () => {
		setIsActiveTimer(!isActiveTimer);
		localStorage.setItem("isActiveTimer", !isActiveTimer);
	};

	useEffect(() => {
		let interval = null;
		if (isActiveTimer) {
			// interval minute
			interval = setInterval(() => {
				setTimer(timer + 1);
			}, 1000);
			localStorage.setItem("timer", timer + 1);
			const hours = Math.floor(timer / 3600);
			const minutes = Math.floor((timer % 3600) / 60);
			const seconds = timer % 60;
			// ser string with leading zeros
			const realTime = `${hours < 10 ? `0${hours}` : hours}:${
				minutes < 10 ? `0${minutes}` : minutes
			}:${seconds < 10 ? `0${seconds}` : seconds}`;
			setRealTime(realTime);
		} else {
			clearInterval(interval);
			localStorage.setItem("timer", 0);
			setTimer(0);
		}
		return () => clearInterval(interval);
	}, [isActiveTimer, timer]);

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
				toggleTimer,
				isActiveTimer,
				timer,
				realTime,
				user,
				vehicles,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};
