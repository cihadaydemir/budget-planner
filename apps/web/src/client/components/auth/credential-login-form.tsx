import { Controller, useForm } from "react-hook-form"

import { signIn, signUp } from "@/client/lib/auth/auth-client"
import { type Static, Type } from "@sinclair/typebox"
import { useLocation, useNavigate } from "@tanstack/react-router"
import { toast } from "sonner"
import { Button, Form, TextField } from "../ui"

export const credentialsSchema = Type.Object({
	name: Type.Optional(
		Type.String({
			errorMessage: { format: "Username is required" },
		}),
	),
	email: Type.String({
		format: "email",
		errorMessage: { format: "Invalid email" },
	}),
	password: Type.String({
		minLength: 8,
		errorMessage: { minLength: "Password must be at least 8 characters" },
	}),
})

export type CredentialsSchemaType = Static<typeof credentialsSchema>

interface CredentialLoginFormProps {
	isSignUp?: boolean
}

export const CredentialLoginForm = ({ isSignUp = false }: CredentialLoginFormProps) => {
	const { handleSubmit, control, setError, formState } = useForm<CredentialsSchemaType>()

	const onSubmit = async (data: CredentialsSchemaType) => {
		const { error } = await signIn.email({
			...data,
			callbackURL: window.location.origin,
		})
		if (error) {
			toast.error(error.message)
		}

		if (isSignUp && data.name) {
			const { error } = await signUp.email({
				...data,
				name: data.name,
				callbackURL: window.location.origin,
			})

			if (error) {
				toast.error(error.message)
			}
		}
	}

	return (
		<Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full">
			{isSignUp && (
				<Controller
					control={control}
					name={"name"}
					render={({ field }) => <TextField {...field} isRequired label="Username" type="text" />}
				/>
			)}
			<Controller
				control={control}
				name={"email"}
				render={({ field, fieldState }) => <TextField {...field} isRequired label="E-Mail" type="email" />}
			/>
			<Controller
				control={control}
				name={"password"}
				render={({ field }) => <TextField {...field} label="Password" isRequired type="password" />}
			/>
			<Button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</Button>
		</Form>
	)
}
