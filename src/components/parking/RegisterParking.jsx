import {
	Button,
	LinearProgress,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import API from "../../config/axios";
import { FormCheckbox, FormSelect } from "../form";
import FormHooks from "../../hooks/formHooks";
import { parkingSchema } from "../../schemas/parking";
import { until } from "../../helpers/until";
import { useState } from "react";

const RegisterParking = () => {
	const { formProps, handleSubmit } = FormHooks(parkingSchema, "onChange");

	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState({});

	const feePer = [
		{ value: "minute", label: "Minute" },
		{ value: "hour", label: "Hour" },
	];

	const onSubmit = async (data) => {
		console.log("Data: ", data);
		setSubmitting(true);
		const [err, res] = await until(API.post("/parkingLots", data));
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
				Register Parking
			</Typography>
			<TextField label="Name *" {...formProps("name")} autoFocus />
			<TextField label="Description *" {...formProps("description")} />
			<TextField label="Address *" {...formProps("address")} />
			<TextField label="Fee *" {...formProps("fee")} type="number" />
			<FormSelect
				label="Fee per *"
				defaultValue={"minute"}
				{...formProps("feePer")}
				options={feePer}
			/>
			<TextField label="minFee *" {...formProps("minFee")} type="number" />
			<TextField label="Coords *" {...formProps("coords")} />
			<TextField label="Capacity *" {...formProps("capacity")} type="number" />
			<FormCheckbox label="Key needed?" {...formProps("keyNeeded")} />
			<Button type="submit" variant="contained" fullWidth>
				Register
			</Button>
		</Paper>
	);
};
export default RegisterParking;
