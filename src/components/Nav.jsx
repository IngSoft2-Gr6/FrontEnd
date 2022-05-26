import { Tabs, Tab } from "@mui/material";

const Nav = () => {
	return (
		<Tabs>
			<Tab label="Home" href="/home" />
			<Tab label="Log In" href="/users/login" />
			<Tab label="Sign Up" href="/users/signup" />
		</Tabs>
	);
};

export default Nav;
