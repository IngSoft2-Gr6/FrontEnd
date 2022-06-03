import { createContext, useEffect, useState } from "react";
import API from "../config/axios";
import { until } from "../helpers/until";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

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

	useEffect(() => {
		if (user) return;
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<UserContext.Provider value={{ user, getUser, logout }}>
			{children}
		</UserContext.Provider>
	);
};
