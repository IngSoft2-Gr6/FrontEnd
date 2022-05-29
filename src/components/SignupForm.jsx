import { yupResolver } from "@hookform/resolvers/yup";
import {
	Button,
	FormGroup,
	LinearProgress,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import API from "../config/axios";
import { until } from "../helpers/until";
import { FormPassword, FormSelect } from "./Form";

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
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({ resolver: yupResolver(schema), mode: "onChange" });
	const navigate = useNavigate();

	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState({});

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

	const onSubmit = async (data) => {
		console.log(data);
		setSubmitting(true);
		const [err, res] = await until(API.post("/users/signup", data));
		setSubmitting(false);
		if (err) return setStatus({ error: err.response.data?.message });
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
			onSubmit={handleSubmit(onSubmit)}
		>
			{submitting && <LinearProgress />}
			<Typography
				variant="h8"
				color={status.error ? "error.main" : "success.main"}
			>
				{status.error || status.success}
			</Typography>
			<Typography align="center" variant="h5">
				Signup
			</Typography>
			<TextField label="Name *" {...formProps("name")} autoFocus />
			<TextField label="Email *" {...formProps("email")} />
			<FormPassword label="Password *" {...formProps("password")} />
			<FormPassword
				label="Confirm password *"
				{...formProps("passwordConfirm")}
			/>
			<FormGroup sx={{ justifyContent: "space-between", display: "flex" }} row>
				<FormSelect
					label="Identity card type"
					defaultValue={1}
					options={identityCardTypes}
					{...formProps("identityCardType")}
					style={{ width: "40%" }}
				/>
				<TextField
					label="Identity card *"
					{...formProps("identityCard")}
					style={{ width: "59%" }}
				/>
			</FormGroup>
			<TextField label="Phone *" {...formProps("phone")} />
			<FormSelect
				label="Role"
				defaultValue={2}
				options={roles}
				{...formProps("roleId")}
			/>
			<Button type="submit" variant="contained" fullWidth>
				Signup
			</Button>
			<Typography
				align="center"
				color="textSecondary"
				variant="body2"
				style={{ marginTop: "1rem" }}
			>
				Already have an account?{" "}
				<Link
					style={{ textDecoration: "none", cursor: "pointer" }}
					onClick={() => navigate("/users/login")}
				>
					Login
				</Link>
			</Typography>
		</Paper>
	);
};

export default SignupForm;
