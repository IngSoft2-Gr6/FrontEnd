import { Box, Tab, Tabs } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Nav = (props) => {
	const location = useLocation();

	const loggedIn = !!localStorage.getItem("loggedIn");
	const [currTab, setCurrTab] = useState(0);
	const [tabs, setTabs] = useState([]);

	useEffect(() => {
		if (loggedIn) {
			setTabs([...props.paths, { label: "Logout", href: "/users/logout" }]);
		} else {
			setTabs([
				...props.paths,
				{ label: "Login", href: "/users/login" },
				{ label: "Signup", href: "/users/signup" },
			]);
		}
	}, [props.paths, loggedIn]);

	// detect when the path changes and update the current tab
	useEffect(() => {
		const currIndexTab = tabs.findIndex(
			({ href }) => href === location.pathname
		);
		setCurrTab(currIndexTab >= 0 ? currIndexTab : 0);
	}, [location, tabs]);

	return (
		<Box p={2}>
			<Tabs
				value={currTab}
				style={{ backgroundColor: "background.paper" }}
				centered
			>
				{tabs.map((path, index) => (
					<Tab
						sx={{
							fontWeight: "bold",
							bgcolor: "primary.main",
							color: "primary.contrastText",
							"&.Mui-selected": {
								bgcolor: "primary.dark",
								color: "primary.contrastText",
							},
							margin: "0.5rem",
							borderRadius: "0.5rem",
						}}
						key={index}
						label={path.label}
						component={Link}
						to={path.href}
					/>
				))}
			</Tabs>
		</Box>
	);
};

export default Nav;
