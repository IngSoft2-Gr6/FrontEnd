import { LinearProgress, Link, Paper, Typography } from "@mui/material";
import { useState } from "react";

import * as yup from "yup";
import API from "../config/axios";
import {
	Form,
	FormButton,
	FormGroup,
	FormInput,
	FormPassword,
	FormSelect,
} from "./Form";

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

	const identityCardTypes = [
		{ value: 1, label: "Identity card" },
		{ value: 2, label: "Passport" },
		{ value: 3, label: "Driving license" },
		{ value: 4, label: "Other" },
	];

	const roles = [
		{ value: 2, label: "Driver" },
		{ value: 3, label: "Parking Lot Owner" },
		{ value: 4, label: "Employee" },
	];

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
		<Paper elevation={24} style={{ padding: "1rem", borderRadius: "1rem" }}>
			{submitting && <LinearProgress />}
			<Form title="Signup" schema={schema} onSubmit={onSubmit}>
				<Typography
					align="center"
					variant="h4"
					gutterBottom
					style={{ fontWeight: "bold" }}
				>
					Signup
				</Typography>
				<FormInput label="Name" name="name" required />
				<FormInput label="Email" name="email" required />
				<FormPassword label="Password" name="password" required />
				<FormPassword
					label="Confirm password"
					name="passwordConfirm"
					required
				/>
				<FormGroup
					sx={{ justifyContent: "space-between", display: "flex" }}
					row
				>
					<FormSelect
						label="Identity card type"
						name="identityCardType"
						defaultValue={1}
						options={identityCardTypes}
						required
						style={{ width: "40%" }}
					/>
					<FormInput
						label="Identity card"
						name="identityCard"
						required
						style={{ width: "59%" }}
					/>
				</FormGroup>
				<FormInput label="Phone number" name="phoneNumber" required />
				<FormSelect
					label="Role"
					name="roleId"
					defaultValue={2}
					options={roles}
					required
				/>
				<FormButton label="Signup" />
				<Typography
					align="center"
					color="textSecondary"
					variant="body2"
					style={{ marginTop: "1rem" }}
				>
					Already have an account?{" "}
					<Link href="/users/login" style={{ textDecoration: "none" }}>
						Login
					</Link>
				</Typography>
			</Form>
			{/* <Typography
				align="center"
				variant="h4"
				gutterBottom
				style={{ fontWeight: "bold" }}
			>
				Signup
			</Typography>
			<hr />
			<form>
				<TextField
					name="name"
					label="Name"
					{...register("name")}
					helperText={errors.name?.message}
					error={!!errors.name}
					fullWidth
					margin="dense"
					required
				/>
				<TextField
					name="email"
					label="Email"
					{...register("email")}
					helperText={errors.email?.message}
					error={!!errors.email}
					fullWidth
					margin="dense"
					required
				/>
				<TextField
					name="password"
					label="Password"
					{...register("password")}
					helperText={errors.password?.message}
					error={!!errors.password}
					fullWidth
					margin="dense"
					required
					type={showPassword ? "text" : "password"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={() => setShowPassword(!showPassword)}
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
					fullWidth
					margin="dense"
					required
					type={showPasswordConfirm ? "text" : "password"}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<IconButton
									onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
								>
									{showPasswordConfirm ? <Visibility /> : <VisibilityOff />}
								</IconButton>
							</InputAdornment>
						),
					}}
				/>
				<FormGroup
					sx={{ display: "flex", justifyContent: "space-between" }}
					row
				>
					<TextField
						name="identityCardType"
						label="Identity Card Type"
						{...register("identityCardType")}
						helperText={errors.identityCardType?.message}
						error={!!errors.identityCardType}
						margin="dense"
						select
						required
						defaultValue={1}
						style={{ width: "49%" }}
					>
						<MenuItem value={1}>Identity Card</MenuItem>
						<MenuItem value={2}>Passport</MenuItem>
						<MenuItem value={3}>Driving License</MenuItem>
					</TextField>
					<TextField
						name="identityCard"
						label="Identity Card Number"
						{...register("identityCard")}
						helperText={errors.identityCard?.message}
						error={!!errors.identityCard}
						margin="dense"
						required
						style={{ width: "49%" }}
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
					fullWidth
					required
					select
					defaultValue={2}
				>
					<MenuItem value={2}>Driver</MenuItem>
					<MenuItem value={3}>Owner</MenuItem>
				</TextField>
				<hr />
				<Button
					color="primary"
					margin="dense"
					type="submit"
					variant="contained"
					fullWidth
					onClick={handleSubmit(onSubmit)}
				>
					Signup
				</Button>
				<Typography
					align="center"
					color="textSecondary"
					variant="body2"
					style={{ marginTop: "1rem" }}
				>
					Already have an account?{" "}
					<Link href="/users/login" style={{ textDecoration: "none" }}>
						Login
					</Link>
				</Typography>
			</form> */}
		</Paper>
	);
};

export default SignupForm;
