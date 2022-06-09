import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const FormHooks = (schema, mode) => {
	const hooks = useForm({
		resolver: yupResolver(schema),
		mode,
	});
	const {
		register,
		formState: { errors },
	} = hooks;
	const formProps = (name) => {
		return {
			error: !!errors[name],
			helperText: errors[name]?.message,
			fullWidth: true,
			margin: "normal",
			variant: "outlined",
			...register(name),
		};
	};
	return { formProps, ...hooks };
};

export default FormHooks;
