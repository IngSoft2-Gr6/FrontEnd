import * as React from "react";
import Rating from "@mui/material/Rating";
import { Typography } from "@mui/material";
import API from "../../config/axios";
import FormHooks from "../../hooks/formHooks";
import { ratingSchema } from "../../schemas/rating";

const RatingParkingLot = () => {
	const { formProps, handleSubmit } = FormHooks(ratingSchema, "onChange");

	const [submitting, setSubmitting] = useState(false);
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
			<Typography component="legend">Rating parking lot</Typography>
			<Rating
				name="Rating Parking Lot"
				defaultValue={2.5}
				precision={0.5}
				{...formProps("ratingParkingLot")}
			/>
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
