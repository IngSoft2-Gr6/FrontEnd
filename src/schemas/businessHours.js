import * as yup from "yup";

const day = yup
	.number()
	.positive("Day must be positive")
	.required("Day is required");
const startTime = yup.date().required("Start time is required");
const endTime = yup.date().required("End time is required");

export const businessHoursSchema = yup.object().shape({
	day,
	startTime,
	endTime,
});
