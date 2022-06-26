import {
	Button,
	LinearProgress,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import API from "../../config/axios";
import { FormSelect } from "../form";
import FormHooks from "../../hooks/formHooks";
import { vehicleSchema } from "../../schemas/vehicle";
import { until } from "../../helpers/until";
import { useState } from "react";

const RegisterVehicle = () => {
	const { formProps, handleSubmit } = FormHooks(vehicleSchema, "onChange");

	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState({});

	const vehicleType = [
		{ value: 1, label: "Car" },
		{ value: 2, label: "Motorcycle" },
	];

	const onSubmit = async (data) => {
		console.log("Data: ", data);
		setSubmitting(true);
		const [err, res] = await until(API.post("/vehicles", data));
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
			<Typography align="center" variant="h5">
				Register Vehicle
			</Typography>
			<FormSelect
				label="Vehicle Type*"
				defaultValue={1}
				options={vehicleType}
				{...formProps("vehicleTypeId")}
			/>
			<TextField label="Plate *" {...formProps("plate")} />
			<TextField label="Model" {...formProps("model")} />
			<TextField label="Color" {...formProps("color")} />
			<TextField label="Brand" {...formProps("brand")} />
			<TextField label="Year" {...formProps("year")} />
			<Button type="submit" variant="contained" fullWidth>
				Register
			</Button>
		</Paper>
	);
};
export default RegisterVehicle;
