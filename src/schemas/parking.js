import * as yup from "yup";

const name = yup.string().required("Name is required");
const description = yup.string().required();
const address = yup.string().required("Address is required");
const coords = yup
	.array()
	.required("Coordinates are required")
	.typeError("Coordinates must be an array");
const fee = yup
	.number()
	.positive("Fee must be positive")
	.required("Fee is required")
	.typeError("Fee must be a number");
const feePer = yup
	.string()
	.required("Fee per is required")
	.oneOf(["hour", "minute"]);
const minFee = yup
	.number()
	.positive("Fee must be positive")
	.required("Fee is required")
	.typeError("Fee must be a number");
const capacity = yup
	.number()
	.integer("Capacity must be an integer")
	.positive("Capacity must be positive")
	.required("Capacity is required")
	.typeError("Capacity must be a number");
const keyNeeded = yup.boolean().required("Key needed is required");

export const parkingSchema = yup.object().shape({
	name,
	description,
	address,
	coords,
	fee,
	feePer,
	minFee,
	capacity,
	keyNeeded,
});
