import {
	Button,
	LinearProgress,
	Paper,
	TextField,
	Typography,
} from "@mui/material";
import API from "../../config/axios";
import { FormCheckbox } from "../form";
import FormHooks from "../../hooks/formHooks";
import { parkingSchema } from "../../schemas/parking";
import { until } from "../../helpers/until";
import { useState } from "react";

const RegisterParking = () => {
	const { formProps, handleSubmit } = FormHooks(parkingSchema, "onChange");

	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState({});
	const parkingId = localStorage.getItem("parkingId");

	const onSubmit = async (data) => {
		console.log("Data: ", data);
		setSubmitting(true);
		const [err, res] = await until(API.patch(`/parking/${parkingId}`, data));
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
				Update Parking
			</Typography>
			<TextField label="Name" {...formProps("name")} autoFocus />
			<TextField label="Description" {...formProps("description")} />
			<TextField label="Address" {...formProps("address")} />
			<TextField label="Fee" {...formProps("fee")} type="number" />
			<TextField label="Coords" {...formProps("coords")} />
			<TextField label="Capacity" {...formProps("capacity")} type="number" />
			<FormCheckbox label="Key needed?" {...formProps("keyNeeded")} />
			<Button
				type="submit"
				variant="contained"
				fullWidth
				onClick={() => {
					console.log("Button clicked");
				}}
			>
				Update
			</Button>
		</Paper>
	);
};
//TODO add Qr code scanner corregir el bussiness hours, añadir el update.
//TODO hacerlo el viernes en la mañana.
export default RegisterParking;
