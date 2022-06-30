import {
	Button,
	FormGroup,
	LinearProgress,
	Link,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import API from "../../config/axios";
import FormHooks from "../../hooks/formHooks";
import { FormPassword, FormSelect } from "../form";
import { signupSchema } from "../../schemas/auth";
import { until } from "../../helpers/until";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const SignupForm = () => {
	const { formProps, handleSubmit } = FormHooks(signupSchema, "onChange");
	const { employee, setEmployee } = useContext(UserContext);
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
	];

	const onSubmit = async (data) => {
		setSubmitting(true);
		if (employee) {
			data = { ...data, token: employee };
		}
		const [err, res] = await until(API.post("/users/signup", data));
		console.log({ err, res });
		setSubmitting(false);
		setEmployee(false);
		if (err) return setStatus({ error: err.response.data?.message });
		setStatus({ success: res.data?.message });
		navigate("#login");
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
				{...formProps("confirmPassword")}
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
			<TextField label="Phone" {...formProps("phone")} />
			<FormSelect
				label="Role"
				defaultValue={employee ? 4 : 2}
				options={employee ? [{ value: 4, label: "Employee" }] : roles}
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
					onClick={() => navigate("#login")}
				>
					Login
				</Link>
			</Typography>
		</Paper>
	);
};

export default SignupForm;
