import * as React from "react";
import Rating from "@mui/material/Rating";
import {
	Input,
	Typography,
	Paper,
	TextField,
	LinearProgress,
	Button,
	Hidden,
} from "@mui/material";
import API from "../../config/axios";
import FormHooks from "../../hooks/formHooks";
import { ratingSchema } from "../../schemas/rating";
import { until } from "../../helpers/until";
import { useState } from "react";
import { useEffect, useContext } from "react";

const RatingParkingLot = () => {
	const { formProps, handleSubmit } = FormHooks(ratingSchema, "onChange");

	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState({});
	const [rating, setRating] = useState();

	const onSubmit = async (data) => {
		const parkingId = localStorage.getItem("parkingLotId");
		console.log("Data: ", data);
		setSubmitting(true);
		//TODO: Ver la ruta correctamente
		const [err, res] = await until(
			API.post(`/parkingLots/${parkingId}/rating`, data)
		);
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
			<Typography component="legend">Rating parking lot</Typography>

			<Rating
				defaultValue={2.5}
				precision={0.5}
				value={rating}
				onChange={(_, value) => {
					setRating(value);
				}}
			/>
			<Input
				type="number"
				value={rating}
				{...formProps("ratingParkingLot")}
			></Input>

			<TextField
				id="outlined-textarea"
				label="Description"
				multiline
				{...formProps("commentParkingLot")}
			/>
			<Button type="submit" variant="contained" fullWidth>
				Rate
			</Button>
		</Paper>
	);
};

export default RatingParkingLot;
