import { Controller, useForm } from "react-hook-form";

import { type Static, Type } from "@sinclair/typebox";
import { Button, Form, TextField } from "../ui";

const credentialsSchema = Type.Object({
	email: Type.String({
		format: "email",
		errorMessage: { format: "Invalid email" },
	}),
	password: Type.String({
		minLength: 8,
		errorMessage: { minLength: "Password must be at least 8 characters" },
	}),
});

type CredentialsSchemaType = Static<typeof credentialsSchema>;

export const CredentialLoginForm = () => {
	const { handleSubmit, control } = useForm<CredentialsSchemaType>();

	const onSubmit = (data: CredentialsSchemaType) => {
		console.log(data);
	};

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			className="flex flex-col gap-3 w-full"
		>
			<Controller
				control={control}
				name={"email"}
				render={({ field }) => (
					<TextField {...field} isRequired label="E-Mail" type="email" />
				)}
			/>
			<Controller
				control={control}
				name={"password"}
				render={({ field }) => (
					<TextField {...field} label="Password" isRequired type="password" />
				)}
			/>
			<Button type="submit">Sign In</Button>
		</Form>
	);
};
