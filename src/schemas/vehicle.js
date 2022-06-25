import * as yup from "yup";

const vehicleTypeId = yup.number().required("Vehicle type is required");
const plate = yup.string().required("Plate is required");
const color = yup.string().required("Color is required");
const brand = yup.string().required("Brand is required");
const model = yup.string().required("Model is required");
const year = yup.number().required("Year is required");
export const vehicleSchema = yup.object().shape({
	vehicleTypeId,
	plate,
	color,
	brand,
	model,
	year,
});
