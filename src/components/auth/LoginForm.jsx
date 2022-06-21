import {
	Button,
	LinearProgress,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import API from "../../config/axios";
import FormHooks from "../../hooks/formHooks";
import { FormCheckbox, FormPassword } from "../form";
import { loginSchema } from "../../schemas/auth";
import { until } from "../../helpers/until";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

const LoginForm = () => {
	const { formProps, handleSubmit, setFocus, trigger, watch } = FormHooks(
		loginSchema,
		"onChange"
	);
	const email = watch("email");
	const navigate = useNavigate();

	// get user context
	const { getUser } = useContext(UserContext);

	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState({});

	const onSubmit = async (data) => {
		setSubmitting(true);
		const [err, res] = await until(API.post("/users/login", data));
		setSubmitting(false);
		if (err) return setStatus({ error: err.response.data?.message });
		setStatus({ success: res.data?.message });
		localStorage.setItem("loggedIn", true);
		await getUser();
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
					onClick={() => navigate("#signup")}
				>
					Sign Up
				</Link>
			</Typography>
		</Paper>
	);
};

export default LoginForm;
