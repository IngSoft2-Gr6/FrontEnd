import {
	Paper,
	TextField,
	Button,
	LinearProgress,
	InputAdornment,
	IconButton,
} from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const schema = yup.object().shape({
	name: yup.string().required("Name is required"),
	email: yup.string().email("Invalid email").required("Email is required"),
	password: yup
		.string()
		.required("Password is required")
		.min(8, "Password must be at least 8 characters"),
	passwordConfirm: yup
		.string()
		.required("Password confirmation is required")
		.oneOf([yup.ref("password")], "Passwords must match"),
});

const SignupForm = () => {
	const [submitting, setSubmitting] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

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
			<h1 align="center">Signup</h1>
			<hr />
			<form>
				<TextField
					name="name"
					label="Name"
					{...register("name")}
					helperText={errors.name?.message}
					error={!!errors.name}
					margin="dense"
					fullWidth
				/>
				<TextField
					name="email"
					label="Email"
					{...register("email")}
					helperText={errors.email?.message}
					error={!!errors.email}
					margin="dense"
					fullWidth
				/>
				<TextField
					name="password"
					label="Password"
					{...register("password")}
					helperText={errors.password?.message}
					error={!!errors.password}
					margin="dense"
					fullWidth
					type={showPassword ? "text" : "password"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => {
										setShowPassword(!showPassword);
									}}
								>
									{showPassword ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<TextField
					name="passwordConfirm"
					label="Confirm Password"
					{...register("passwordConfirm")}
					helperText={errors.passwordConfirm?.message}
					error={!!errors.passwordConfirm}
					margin="dense"
					fullWidth
					type={showPasswordConfirm ? "text" : "password"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => {
										setShowPasswordConfirm(!showPasswordConfirm);
									}}
								>
									{showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
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
					margin="dense"
					onClick={handleSubmit(onSubmit)}
					fullWidth
				>
					Signup
				</Button>
			</form>
		</Paper>
	);
};

export default SignupForm;
