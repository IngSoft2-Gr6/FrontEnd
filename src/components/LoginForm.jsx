import {
	Paper,
	TextField,
	Button,
	LinearProgress,
	IconButton,
	InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";

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
		setTimeout(() => {
			setSubmitting(false);
		}, 5000);
	};

	return (
		<Paper style={{ padding: "1rem" }}>
			<div>{submitting && <LinearProgress />}</div>
			<h1 align="center">Login</h1>
			<hr />
			<form>
				<TextField
					name="email"
					label="Email"
					{...register("email")}
					helperText={errors.email?.message}
					error={!!errors.email}
					margin="normal"
					fullWidth
				/>
				<TextField
					name="password"
					label="Password"
					{...register("password")}
					helperText={errors.password?.message}
					error={!!errors.password}
					margin="normal"
					fullWidth
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
				<hr />
				<Button
					type="submit"
					variant="contained"
					color="primary"
					margin="normal"
					onClick={handleSubmit(onSubmit)}
					fullWidth
				>
					Login
				</Button>
			</form>
		</Paper>
	);
};

export default LoginForm;
