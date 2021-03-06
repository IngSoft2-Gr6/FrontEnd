import * as React from "react";
import Rating from "@mui/material/Rating";
import {
	Typography,
	Paper,
	TextField,
	LinearProgress,
	Button,
} from "@mui/material";
import API from "../../config/axios";
import FormHooks from "../../hooks/formHooks";
import { ratingSchema } from "../../schemas/rating";
import { until } from "../../helpers/until";
import { useState } from "react";

const RatingDriver = () => {
	const { formProps, handleSubmit } = FormHooks(ratingSchema, "onChange");

	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState({});
	const onSubmit = async (data) => {
		console.log("Data: ", data);
		setSubmitting(true);
		//TODO: Ver la ruta correctamente
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
			<Typography component="legend">Rating driver</Typography>
			<Rating
				name="Rating Drive"
				defaultValue={2.5}
				precision={0.5}
				{...formProps("ratingDriver")}
			/>
			<TextField
				id="outlined-textarea"
				label="Description"
				multiline
				{...formProps("commentDriver")}
			/>
			<Button type="submit" variant="contained" fullWidth>
				Rate
			</Button>
		</Paper>
	);
};

export default RatingDriver;
