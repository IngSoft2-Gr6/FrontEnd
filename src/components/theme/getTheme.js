import darkTheme from "./darkTheme";
import lightTheme from "./lightTheme";

const getTheme = () => {
	const mode = localStorage.getItem("theme");
	return mode === "light" ? lightTheme : darkTheme;
};

export default getTheme;
