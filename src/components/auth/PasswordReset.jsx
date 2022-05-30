import { useLocation, useNavigate } from "react-router-dom";
import API from "../../config/axios";
import { until } from "../../helpers/until";

import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, LinearProgress, Paper, Typography } from "@mui/material";
import { FormPassword } from "../form";
import { useState } from "react";

const schema = yup.object().shape({
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters"),
	confirmPassword: yup
		.string()
		.required("Confirm password is required")
		.oneOf([yup.ref("password")], "Passwords must match"),
});

const PasswordReset = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const token = new URLSearchParams(location.search).get("token");

	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState({});

	const {
		handleSubmit,
		register,
		watch,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema), mode: "onChange" });

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

	const formProps = (name) => {
		return {
			error: !!errors[name],
			helperText: errors[name]?.message,
			fullWidth: true,
			margin: "normal",
			variant: "outlined",
			...register(name),
		};
	};

	return (
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
	);
};

export default PasswordReset;
