import { LinearProgress, Link, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
	const navigate = useNavigate();

	const [submitting, setSubmitting] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

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
		console.log(data);
		setSubmitting(true);
		API.post("/users/signup", data)
			.then((res) => {
				console.log(res);
				setSubmitting(false);
				setSuccess(res.data?.message || "Signup successful");
				setError("");
				navigate("/users/login");
			})
			.catch((err) => {
				console.log(err);
				setSubmitting(false);
				setError(err.response.data?.message || "Something went wrong");
				setSuccess("");
			});
	};

	return (
		<Paper elevation={24} style={{ padding: "1rem", borderRadius: "1rem" }}>
			{submitting && <LinearProgress />}
			{error && (
				<Typography variant="body2" color="error.main">
					{error}
				</Typography>
			)}
			{success && (
				<Typography variant="body2" color="success.main">
					{success}
				</Typography>
			)}
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
				<FormInput label="Phone number" name="phone" />
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
		</Paper>
	);
};

export default SignupForm;
