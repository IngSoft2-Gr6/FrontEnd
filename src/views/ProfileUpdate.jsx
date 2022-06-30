import { Box, Container } from "@mui/material";
import UpdateProfile from "../components/profile/updateProfile";

const ProfileUpdate = () => {
	return (
		<Container maxWidth="sm">
			<Box my={4}>
				<UpdateProfile />
			</Box>
		</Container>
	);
};

export default ProfileUpdate;