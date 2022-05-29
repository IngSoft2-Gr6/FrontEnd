import { yupResolver } from "@hookform/resolvers/yup";
import {
	Button,
	LinearProgress,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FormCheckbox, FormPassword } from "../form";

import * as yup from "yup";
import API from "../../config/axios";
import { until } from "../../helpers/until";

const schema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
	const {
		handleSubmit,
		register,
		setFocus,
		trigger,
		watch,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema), mode: "onChange" });
	const email = watch("email");
	const navigate = useNavigate();

	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState({});

	const onSubmit = async (data) => {
		console.log(data);
		setSubmitting(true);
		const [err, res] = await until(API.post("/users/login", data));
		setSubmitting(false);
		if (err) return setStatus({ error: err.response.data?.message });
		setStatus({ success: res.data?.message });
		localStorage.setItem("loggedIn", true);
		navigate("/home");
	};

	const forgotPassword = async () => {
		// Email is required to reset password
		if (!email) {
			setFocus("email");
			trigger("email");
			return;
		}
		setSubmitting(true);
		const [err, res] = await until(API.post("/users/password", { email }));
		setSubmitting(false);
		if (err) return setStatus({ error: err.response.data?.message });
		setStatus({ success: res.data?.message });
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
			onSubmit={handleSubmit(onSubmit)}
		>
			{submitting && <LinearProgress />}
			<Typography
				variant="h8"
				color={status.error ? "error.main" : "success.main"}
			>
				{status.error || status.success}
			</Typography>
			<Typography variant="h5" align="center">
				Login
			</Typography>
			<TextField label="Email *" {...formProps("email")} autoFocus />
			<FormPassword label="Password *" {...formProps("password")} />
			<FormCheckbox name="remember" label="Remember me" defaultChecked />
			<Typography variant="body2" color="textSecondary" align="center">
				<Link
					style={{ textDecoration: "none", cursor: "pointer" }}
					onClick={forgotPassword}
				>
					Forgot Password?
				</Link>
			</Typography>
			<Button type="submit" variant="contained" fullWidth>
				Login
			</Button>
			<Typography
				align="center"
				color="textSecondary"
				variant="body2"
				style={{ marginTop: "1rem" }}
			>
				Not a member?{" "}
				<Link
					style={{ textDecoration: "none", cursor: "pointer" }}
					onClick={() => navigate("/users/signup")}
				>
					Sign Up
				</Link>
			</Typography>
		</Paper>
	);
};

export default LoginForm;
