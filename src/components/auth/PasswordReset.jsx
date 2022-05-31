import {
	Button,
	Container,
	LinearProgress,
	Paper,
	Typography,
} from "@mui/material";
import API from "../../config/axios";
import FormHooks from "../../hooks/formHooks";
import { FormPassword } from "../form";
import { passwordResetSchema } from "../../schemas/auth";
import { until } from "../../helpers/until";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const PasswordReset = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const token = new URLSearchParams(location.search).get("token");

	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState({});

	const { formProps, handleSubmit, watch } = FormHooks(
		passwordResetSchema,
		"onChange"
	);

	const password = watch("password");

	const reset = async () => {
		setSubmitting(true);
		const [err, res] = await until(
			API.post("/users/password/reset", { token, password })
		);
		setSubmitting(false);
		if (err) return setStatus({ error: err.message.data?.message });
		setStatus({ success: res.data?.message });
		navigate("/users/login");
	};

	return (
		<Container maxWidth="sm">
			<Paper
				component="form"
				elevation={24}
				style={{ padding: "1rem", borderRadius: "1rem" }}
				onSubmit={handleSubmit(reset)}
			>
				{submitting && <LinearProgress />}
				<Typography
					variant="h8"
					color={status.error ? "error.main" : "success.main"}
				>
					{status.error || status.success}
				</Typography>
				<Typography variant="h4">Reset Password</Typography>
				<FormPassword {...formProps("password")} label="Password" />
				<FormPassword
					{...formProps("confirmPassword")}
					label="Confirm Password"
				/>
				<Button type="submit" variant="contained" fullWidth>
					Reset Password
				</Button>
			</Paper>
		</Container>
	);
};

export default PasswordReset;
