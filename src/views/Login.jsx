import { Box, Container } from "@mui/material";
import LoginForm from "../components/LoginForm";

const Login = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<LoginForm />
			</Box>
		</Container>
	);
};

export default Login;
