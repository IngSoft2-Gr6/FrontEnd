import {
	Button,
	LinearProgress,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import API from "../../config/axios";
import { FormCheckbox } from "../form";
import FormHooks from "../../hooks/formHooks";
import { useLocation, useNavigate } from "react-router-dom";
import { profileSchema } from "../../schemas/profile";
import { until } from "../../helpers/until";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { Navigate } from "react-router-dom";

const UpdateProfile = () => {
	const { formProps, handleSubmit } = FormHooks(profileSchema, "onChange");
	const { user } = useContext(UserContext);
	const navigate = useNavigate();
	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState({});
	const [userId, setUserId] = useState();

	useEffect(() => {
		const userid = user.userId;
		console.log(userid);
		setUserId(userid);
	}, [user]);

	const onSubmit = async (data) => {
		console.log("Data: ", data);
		setSubmitting(true);
		const [err, res] = await until(API.patch(`/users/profile`, data));
		setSubmitting(false);
		if (err) return setStatus({ error: err.response.data?.message });
		setStatus({ success: res.data?.message });
		navigate("/home");
	};

	return (
		<Paper
			component="form"
			elevation={24}
			style={{ padding: "1rem", borderRadius: "1rem" }}
			onSubmit={handleSubmit(onSubmit)}
		>
			{submitting && <LinearProgress />}
			<Typography
				variant="h8"
				color={status.error ? "error.main" : "success.main"}
			>
				{status.error || status.success}
			</Typography>
			<Typography align="center" variant="h5">
				Update Parking
			</Typography>
			<TextField label="name" {...formProps("name")} autoFocus />
			<TextField label="identityCard" {...formProps("identityCard")} />
			<TextField label="email" {...formProps("email")} />
			<TextField label="password" {...formProps("password")} />
			<TextField label="phone" {...formProps("phone")} />
			<Button
				type="submit"
				variant="contained"
				fullWidth
				onClick={() => {
					console.log("Button clicked");
				}}
			>
				Update
			</Button>
		</Paper>
	);
};

export default UpdateProfile;
