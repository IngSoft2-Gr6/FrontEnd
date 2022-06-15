import { Box, Container } from "@mui/material";
import SignupForm from "../components/auth/SignupForm";

const Signup = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<SignupForm />
			</Box>
		</Container>
	);
};

export default Signup;
