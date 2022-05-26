import {
	Paper,
	TextField,
	Button,
	LinearProgress,
	InputAdornment,
	IconButton,
	FormGroup,
	MenuItem,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";
import API from "../config/axios";

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
	identityCardType: yup.number().required("Identity card type is required"),
	identityCard: yup.string().required("Identity card is required"),
	roleId: yup.number().required("Role is required"),
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
		console.log({ ...data });
		setSubmitting(true);
		API.post("/users/signup", data)
			.then((res) => {
				console.log(res);
				setSubmitting(false);
			})
			.catch((err) => {
				console.log(err);
				setSubmitting(false);
			});
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
					required
					fullWidth
				/>
				<TextField
					name="email"
					label="Email"
					{...register("email")}
					helperText={errors.email?.message}
					error={!!errors.email}
					margin="dense"
					required
					fullWidth
				/>
				<TextField
					name="password"
					label="Password"
					{...register("password")}
					helperText={errors.password?.message}
					error={!!errors.password}
					margin="dense"
					required
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
					required
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
				<FormGroup row>
					<TextField
						name="identityCardType"
						label="Identity Card Type"
						{...register("identityCardType")}
						helperText={errors.identityCardType?.message}
						error={!!errors.identityCardType}
						margin="dense"
						required
						style={{ width: "50%" }}
						defaultValue={1}
						select
					>
						<MenuItem value={1}>Identity Card</MenuItem>
						<MenuItem value={2}>Passport</MenuItem>
						<MenuItem value={3}>Driving License</MenuItem>
					</TextField>
					{/* <div style={{ width: "1%" }}></div> */}
					<TextField
						name="identityCard"
						label="Identity Card Number"
						{...register("identityCard")}
						helperText={errors.identityCard?.message}
						error={!!errors.identityCard}
						style={{ width: "50%" }}
						required
						margin="dense"
					/>
				</FormGroup>
				<TextField
					name="phone"
					label="Phone"
					{...register("phone")}
					helperText={errors.phone?.message}
					error={!!errors.phone}
					margin="dense"
					fullWidth
				/>
				<TextField
					name="roleId"
					label="Role"
					{...register("roleId")}
					helperText={errors.roleId?.message}
					error={!!errors.roleId}
					margin="dense"
					required
					defaultValue={2}
					select
					fullWidth
				>
					<MenuItem value={2}>Driver</MenuItem>
					<MenuItem value={3}>Owner</MenuItem>
				</TextField>
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
