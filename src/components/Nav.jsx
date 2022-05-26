import { Tabs, Tab } from "@mui/material";

const Nav = () => {
	const paths = [
		{ label: "Home", href: "/home" },
		{ label: "Login", href: "/users/login" },
		{ label: "Signup", href: "/users/signup" },
	];

	const url = new URL(window.location.href);
	const tab = paths.findIndex((path) => path.href === url.pathname);

	return (
		<Tabs value={tab}>
			{paths.map((path, index) => (
				<Tab
					label={path.label}
					href={path.href}
					value={index}
					key={path.label}
				/>
			))}
		</Tabs>
	);
};

export default Nav;
