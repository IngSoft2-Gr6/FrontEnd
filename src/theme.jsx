import { createTheme } from "@mui/material";

export const lightTheme = createTheme({
	palette: {
		mode: "light",
		// primary: {
		// 	main: "#00bcd4",
		// 	light: "#80deea",
		// 	dark: "#0097a7",
		// 	contrastText: "#fff",
		// },
		// secondary: {
		// 	main: "#ff9800",
		// 	light: "#ffb74d",
		// 	dark: "#f57c00",
		// 	contrastText: "#fff",
		// },
	},
	// text: {
	// 	primary: "#fff",
	// 	secondary: "#fafafa",
	// 	disabled: "#bdbdbd",
	// },
	// background: {
	// 	paper: "#fff",
	// 	default: "#fafafa",
	// },
});

export const darkTheme = createTheme({
	palette: {
		mode: "dark",
		// primary: {
		// 	main: "#90caf9",
		// 	light: "#b3e5fc",
		// 	dark: "#64b5f6",
		// 	contrastText: "#fff",
		// },
		// secondary: {
		// 	main: "#ffc107",
		// 	light: "#ffd54f",
		// 	dark: "#ffa000",
		// 	contrastText: "#fff",
		// },
	},
	// text: {
	// 	primary: "#000",
	// 	secondary: "#212121",
	// 	disabled: "#757575",
	// },
	// background: {
	// 	paper: "#212121",
	// 	default: "#303030",
	// },
});

export const toggleTheme = () => {
	const mode = localStorage.getItem("theme");
	localStorage.setItem("theme", mode === "light" ? "dark" : "light");
	return mode === "light" ? darkTheme : lightTheme;
};

export const getTheme = () => {
	const mode = localStorage.getItem("theme");
	return mode === "light" ? lightTheme : darkTheme;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
	lightTheme,
	darkTheme,
	toggleTheme,
	getTheme,
};
