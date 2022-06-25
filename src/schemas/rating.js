import * as yup from "yup";

const commentParkinLot = yup.string();
const commentDriver = yup.string();
const ratingParkinLot = yup.number();
const ratingDriver = yup.number();

export const ratingSchema = yup.object().shape({
	commentParkinLot,
	commentDriver,
	ratingParkinLot,
	ratingDriver,
});
