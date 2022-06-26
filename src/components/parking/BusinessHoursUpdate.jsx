import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import {
	Button,
	LinearProgress,
	Paper,
	Stack,
	Typography,
} from "@mui/material";
import API from "../../config/axios";
import { FormSelect } from "../form";
import FormHooks from "../../hooks/formHooks";
import { businessHoursSchema } from "../../schemas/businessHours";
import { until } from "../../helpers/until";
import { useState, useEffect } from "react";

const BusinessHoursUpdate = () => {
	const { formProps, handleSubmit, watch, getValues } = FormHooks(
		businessHoursSchema,
		"onChange"
	);

	const startTime = watch("startTime", new Date());
	const endTime = watch("endTime", new Date());

	const watchDay = watch("day", 1);

	const [submitting, setSubmitting] = useState(false);
	const [status, setStatus] = useState({});
	// const [startTime, setStartTime] = useState(new Date());
	// const [endTime, setEndTime] = useState(new Date());

	useEffect(() => {
		console.log("\nStart Time: ", startTime);
		console.log("Type", typeof startTime);
		console.log("is startTime Date?", startTime instanceof Date);
		console.log("\nEnd Time: ", endTime);
		console.log("Type", typeof endTime);
		console.log("is endTime Date?", endTime instanceof Date);
		console.log("Day: ", watchDay);
	}, [startTime, endTime, watchDay]);

	const days = [
		{ value: "1", label: "Monday" },
		{ value: "2", label: "Tuesday" },
		{ value: "3", label: "Wednesday" },
		{ value: "4", label: "Thursday" },
		{ value: "5", label: "Friday" },
		{ value: "6", label: "Saturday" },
		{ value: "7", label: "Sunday" },
	];
	const onSubmit = async (data) => {
		console.log("Data: ", data);
		const parkingLotId = "a7d91e84-f024-4bc7-9913-12575e1a0b69";
		setSubmitting(true);
		const [err, res] = await until(
			API.patch(`/parkingLots/${parkingLotId}/businessHours`, data)
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
			<Stack spacing={3}>
				<Typography align="center" variant="h5">
					Update Business hours
				</Typography>
				<FormSelect
					label="Day"
					options={days}
					defaultValue={1}
					{...formProps("day")}
				/>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<TimePicker
						label="Start Time"
						// value={startTime}
						// onChange={setStartTime}
						{...formProps("startTime")}
						renderInput={(params) => {
							console.info({ paramsStartTime: params });
							return <TextField {...params} />;
						}}
					/>
				</LocalizationProvider>
				<LocalizationProvider dateAdapter={AdapterDateFns}>
					<TimePicker
						label="End Time"
						// value={endTime}
						// onChange={setEndTime}
						{...formProps("endTime")}
						renderInput={(params) => <TextField {...params} />}
					/>
				</LocalizationProvider>
				<Button
					type="submit"
					variant="contained"
					fullWidth
					onClick={() => {
						console.log("Button clicked");
						console.log("Values", getValues());
					}}
				>
					Update
				</Button>
			</Stack>
		</Paper>
	);
};

export default BusinessHoursUpdate;
