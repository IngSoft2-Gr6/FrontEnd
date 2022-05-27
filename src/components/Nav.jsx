import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const Nav = (props) => {
	const [currTab, setCurrTab] = useState(
		props.paths.findIndex(({ href }) => href === window.location.pathname)
	);

	const handleChange = (_, value) => setCurrTab(value);

	return (
		<Box p={2}>
			<Tabs value={currTab} onChange={handleChange} centered>
				{props.paths.map((path, index) => (
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
