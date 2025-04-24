import { Button, Form, Modal, NumberField, TextField } from "./ui"
import { Controller, useForm } from "react-hook-form"

import { toast } from "sonner"
import { useCreatePocketMutation } from "@/client/hooks/pockets/useCreatePocketMutation"
import { useEditPocket } from "@/client/hooks/pockets/useEditPocket"
import { useEffect } from "react"

import { useQueryClient } from "@tanstack/react-query"
import { zodResolver } from "@hookform/resolvers/zod"
import { insertPocketSchema, type InsertPocketSchemaType, type Pocket } from "@/server/db/zod"

interface CreatePocketModalProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	editingPocket?: Pocket
	setEditingPocket?: (editingPocket: Pocket | undefined) => void
}

export const CreatePocketModal = ({ editingPocket, setEditingPocket, isOpen, setIsOpen }: CreatePocketModalProps) => {
	const queryClient = useQueryClient()
	const { control, handleSubmit, reset } = useForm({
		resolver: zodResolver(insertPocketSchema),
	})
	const createPocketMutation = useCreatePocketMutation()
	const editPocketMutation = useEditPocket()

	const onSubmit = (data: InsertPocketSchemaType) => {
		if (editingPocket) {
			editPocketMutation.mutate(
				{
					data,
					pocketId: editingPocket.id,
				},
				{
					async onSuccess(data, variables, context) {
						setIsOpen(false)
						queryClient.invalidateQueries({
							queryKey: ["pockets"],
						})
						const res = await data.json()
						toast(`Pocket ${res.name} updated successfully`)
						setTimeout(() => {
							setEditingPocket?.(undefined)
							reset()
						}, 200)
					},
				},
			)
		} else {
			createPocketMutation.mutate(data, {
				async onSettled(data, variables, context) {
					// queryClient.invalidateQueries({
					// 	queryKey: ["pockets"],
					// })
					setIsOpen(false)

					setTimeout(() => {
						setEditingPocket?.(undefined)
						reset()
					}, 200)
				},
			})
		}
	}
	useEffect(() => {
		reset({
			name: editingPocket?.name ?? "",
			description: editingPocket?.description ?? "",
			budget: editingPocket?.budget ?? undefined,
		})
	}, [editingPocket, reset])

	return (
		<>
			<Modal.Content
				isBlurred
				isOpen={isOpen}
				onOpenChange={(val) => {
					setIsOpen(val)
					setTimeout(() => {
						setEditingPocket?.(undefined)
						reset()
					}, 200)
				}}
			>
				<Modal.Header>
					<Modal.Title>{`${editingPocket ? "Edit" : "Create"} Pocket`}</Modal.Title>
					<Modal.Description>
						To be able to manage your budgets, you need to create a pocket.
					</Modal.Description>
				</Modal.Header>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						<Controller
							control={control}
							name="name"
							render={({ field, fieldState, formState }) => (
								<TextField
									{...field}
									defaultValue={formState.defaultValues?.name}
									isRequired
									autoFocus
									label="Name"
									placeholder="Wedding, Honeymoon, Holiday, etc"
								/>
							)}
						/>
						<Controller
							control={control}
							name="description"
							render={({ field }) => <TextField {...field} label="Description" />}
						/>
						<Controller
							control={control}
							name="budget"
							render={({ field }) => (
								<NumberField {...field} name="budget" label="Budget" value={field.value} />
							)}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Modal.Close>Close</Modal.Close>

						<Button type="submit">{`${editingPocket ? "Update" : "Create"}`}</Button>
					</Modal.Footer>
				</Form>
			</Modal.Content>
		</>
	)
}
