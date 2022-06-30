import * as React from "react";
import Rating from "@mui/material/Rating";
import {
	Input,
	Typography,
	Paper,
	TextField,
	LinearProgress,
	Button,
	Grid,
	Avatar,
} from "@mui/material";
import API from "../../config/axios";
import FormHooks from "../../hooks/formHooks";
import { ratingSchema } from "../../schemas/rating";
import { until } from "../../helpers/until";
import { useState } from "react";

const RatingParkingLot = () => {
	const { formProps, handleSubmit } = FormHooks(ratingSchema, "onChange");
	const ratings = JSON.parse(localStorage.getItem("ratings"));
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
			sx={{ overflow: "auto", maxHeight: "90vh" }}
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
			<Grid container spacing="15" width="100%">
				<Grid item xs={12}>
					<Grid container spacing="3">
						<Grid item lg={12} md={12} sm={12} xs={12}>
							<Typography> Comments</Typography>
							<hr></hr>
						</Grid>
					</Grid>
				</Grid>

				{ratings.map((rating) => (
					<>
						<Grid item xs={12}>
							<Grid container spacing="50">
								<Grid item lg={3} md={3} sm={3} xs={3}>
									<Avatar sx={{ left: "50%", bgcolor: "primary.main" }}>
										{rating.driverName.charAt(0)}
									</Avatar>
								</Grid>
								<Grid item lg={9} md={9} sm={9} xs={9}>
									<Typography variant="h7">{rating.driverName}</Typography>
									<br />
									<Rating
										name="Rating Parking Lot"
										defaultValue={rating.ratingParkingLot}
										precision={0.5}
										readOnly
									/>
								</Grid>
							</Grid>
						</Grid>

						<Grid item xs={12}>
							<Grid container spacing="">
								<Grid item lg={12} md={12} sm={12} xs={12}>
									<Typography
										style={{ margin: "0px", width: "100%", overflow: "auto" }}
									>
										{rating.commentParkingLot}
									</Typography>
									<hr size="1"></hr>
								</Grid>
							</Grid>
						</Grid>
					</>
				))}
			</Grid>
		</Paper>
	);
};

export default RatingParkingLot;
