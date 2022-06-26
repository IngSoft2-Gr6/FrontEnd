import * as yup from "yup";

const vehicleTypeId = yup.number().required("Vehicle type is required");
const plate = yup.string().required("Plate is required");
const color = yup.string();
const brand = yup.string();
const model = yup.string();
const year = yup.number();
export const vehicleSchema = yup.object().shape({
	vehicleTypeId,
	plate,
	color,
	brand,
	model,
	year,
});
