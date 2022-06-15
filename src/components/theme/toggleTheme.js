import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";

const toggleTheme = () => {
	const mode = localStorage.getItem("theme");
	localStorage.setItem("theme", mode === "light" ? "dark" : "light");
	return mode === "light" ? darkTheme : lightTheme;
};

export default toggleTheme;
