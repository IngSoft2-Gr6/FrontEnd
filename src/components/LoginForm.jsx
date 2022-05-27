import {
	Button,
	Checkbox,
	FormControlLabel,
	FormGroup,
	IconButton,
	InputAdornment,
	LinearProgress,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

import * as yup from "yup";
import API from "../config/axios";

const schema = yup.object().shape({
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters"),
});

const LoginForm = () => {
	const [submitting, setSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		console.log(data);
		setSubmitting(true);
		API.post("/users/login", data)
			.then((res) => {
				console.log(res);
				setSubmitting(false);
			})
			.catch((err) => {
				console.log(err);
				setSubmitting(false);
			});
	};

	const forgotPassword = () => {
		// TODO: forgot password functionality
		console.log("forgot password");
	};

	return (
		<Paper elevation={24} style={{ padding: "1rem", borderRadius: "1rem" }}>
			{submitting && <LinearProgress />}
			{/* // bold */}
			<Typography
				align="center"
				gutterBottom
				variant="h4"
				style={{ fontWeight: "bold" }}
			>
				Login
			</Typography>
			<hr />
			<form>
				<TextField
					name="email"
					label="Email"
					{...register("email")}
					helperText={errors.email?.message}
					error={!!errors.email}
					fullWidth
					margin="normal"
					required
				/>
				<TextField
					name="password"
					label="Password"
					{...register("password")}
					helperText={errors.password?.message}
					error={!!errors.password}
					fullWidth
					margin="normal"
					required
					type={showPassword ? "text" : "password"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowPassword(!showPassword)}
									onMouseDown={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<Typography variant="body2" color="textSecondary" align="center">
					<Link onClick={forgotPassword} style={{ textDecoration: "none" }}>
						Forgot Password?
					</Link>
				</Typography>
				<FormGroup row style={{ justifyContent: "center" }}>
					<FormControlLabel
						control={<Checkbox color="primary" defaultChecked />}
						label="Remember me"
					/>
				</FormGroup>
				<hr />
				<Button
					color="primary"
					fullWidth
					margin="normal"
					type="submit"
					variant="contained"
					onClick={handleSubmit(onSubmit)}
				>
					Login
				</Button>
				<Typography
					align="center"
					color="textSecondary"
					variant="body2"
					style={{ marginTop: "1rem" }}
				>
					Not a member?{" "}
					<Link href="/users/signup" style={{ textDecoration: "none" }}>
						Sign Up
					</Link>
				</Typography>
			</form>
		</Paper>
	);
};

export default LoginForm;
