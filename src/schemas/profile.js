import * as yup from "yup";

const name = yup.string();
const identityCard = yup.number();
const email = yup.string();
const password = yup.string();
const phone = yup.number();

export const profileSchema = yup.object().shape({
	name,
  identityCard,
  email,
  password,
  phone
});