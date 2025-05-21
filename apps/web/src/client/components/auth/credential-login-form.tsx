import { Button, Form, TextField } from "../ui"
import { Controller, useForm } from "react-hook-form"
import { signIn, signUp } from "@/client/lib/auth/auth-client"
import { useLocation, useNavigate } from "@tanstack/react-router"

import { toast } from "sonner"

interface CredentialLoginFormProps {
	isSignUp?: boolean
}

export const CredentialLoginForm = ({ isSignUp = false }: CredentialLoginFormProps) => {
	const { handleSubmit, control, setError, formState } = useForm()

	const onSubmit = async (data: any) => {
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
		<Form onSubmit={handleSubmit(onSubmit)} className="flex w-full flex-col gap-3">
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
