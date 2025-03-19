import { useCreateTransactionMutation } from "@/hooks/transactions/useCreateTransactionMutation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { IconPlus } from "justd-icons"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button, Checkbox, Form, Label, Modal, NumberField, Switch, TextField } from "./ui"
import { insertTransactionSchema, type InsertTransactionSchemaType } from "@hono/db/zod"

export const CreateTransactionModal = () => {
	const params = useParams({ from: "/_app/pocket/$pocketId" })
	const queryClient = useQueryClient()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { control, handleSubmit, reset, setValue } = useForm({
		resolver: zodResolver(insertTransactionSchema),
		defaultValues: {
			pocketId: params.pocketId,
			isPaid: false,
		},
	})
	const [isPaid, setIsPaid] = useState(false)
	const createTransactionMutation = useCreateTransactionMutation()

	const onSubmit = (data: InsertTransactionSchemaType) => {
		createTransactionMutation.mutate(
			{ ...data, pocketId: params.pocketId },
			{
				onSuccess: async (data, variables, context) => {
					queryClient.invalidateQueries({
						queryKey: ["transactions", params.pocketId],
					})
					setIsModalOpen(false)
					reset()
					const res = await data.json()

					toast(`Transaction ${res?.[0].name} created successfully`)
				},
			},
		)
	}

	return (
		<Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
			<Button>
				<IconPlus className="" />
				Add Expense
			</Button>
			<Modal.Content isBlurred>
				<Modal.Header>
					<Modal.Title>Add Expense</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body className="mb-2 flex flex-col gap-2">
						<Controller
							control={control}
							name="name"
							render={({ field }) => (
								<TextField
									{...field}
									isRequired
									autoFocus
									label="Name"
									placeholder="Plane tickets, Accommodation, etc"
								/>
							)}
						/>
						<Controller
							control={control}
							name="description"
							render={({ field }) => (
								<TextField
									{...field}
									label="Description"
									placeholder="Describe what your expense is about."
								/>
							)}
						/>
						<Controller
							control={control}
							name="amount"
							render={({ field }) => (
								<NumberField
									{...field}
									formatOptions={{
										currency: "EUR",
										currencyDisplay: "code",
										currencySign: "accounting",
									}}
									isRequired
									label="Amount"
									placeholder="100"
								/>
							)}
						/>
						{/* 
						TODO: replaced with checkbox until switch is fixed
						<Controller
							control={control}
							name="isPaid"
							render={({ field, formState }) => (
								<div className="flex w-max gap-3 border-input border p-2 rounded-lg">
									<Label>Is Paid</Label>
									<Switch
										onChange={(value) => {
											field.onChange(value);
										}}
										isSelected={isPaid}
									/>
								</div>
							)}
						/> */}
						<Controller
							control={control}
							name="isPaid"
							render={({ field, formState }) => (
								<div className="flex w-max gap-3 rounded-lg border border-input p-2">
									<Label>Is Paid</Label>
									<Checkbox isSelected={field.value} onChange={field.onChange} />
								</div>
							)}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Modal.Close>Cancel</Modal.Close>
						<Button type="submit">Add</Button>
					</Modal.Footer>
				</Form>
			</Modal.Content>
		</Modal>
	)
}
