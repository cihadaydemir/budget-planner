import { Button, Checkbox, Form, Label, Modal, NumberField, TextField } from "./ui"
import { Controller, useForm } from "react-hook-form"

import {
	type ExtendedPocket,
	insertTransactionSchema,
	type InsertTransactionSchemaType,
	type Transaction,
} from "@/server/db/arktype"
import { toast } from "sonner"
import { useCreateTransactionMutation } from "@/client/hooks/transactions/useCreateTransactionMutation"
import { useEditTransaction } from "@/client/hooks/transactions/useEditTransaction"
import { useEffect } from "react"
import { useFilter } from "react-aria-components"
import { useParams } from "@tanstack/react-router"
import { useQueryClient } from "@tanstack/react-query"
import { arktypeResolver } from "@hookform/resolvers/arktype"

interface CreateTransactionModalProps {
	isOpen: boolean
	setIsOpen: (isOpen: boolean) => void
	editingTransaction?: Transaction
	setEditingTransaction?: (editingTransaction: Transaction | undefined) => void
}

export const CreateTransactionModal = ({
	isOpen,
	setIsOpen,
	editingTransaction,
	setEditingTransaction,
}: CreateTransactionModalProps) => {
	const params = useParams({ from: "/_app/pocket/$pocketId" })
	const queryClient = useQueryClient()

	const { contains } = useFilter({ sensitivity: "base" })
	const { control, handleSubmit, reset } = useForm<InsertTransactionSchemaType>({
		resolver: arktypeResolver(insertTransactionSchema),
		defaultValues: {
			pocketId: params.pocketId,
			currency: "EUR",
		},
	})

	const createTransactionMutation = useCreateTransactionMutation()
	const editTransactionMutation = useEditTransaction()

	const onSubmit = (data: InsertTransactionSchemaType) => {
		if (editingTransaction) {
			editTransactionMutation.mutate({ transactionId: editingTransaction.id, data })
		} else {
			createTransactionMutation.mutate(
				{ ...data, pocketId: params.pocketId },
				{
					onSuccess: async (data, variables) => {
						queryClient.invalidateQueries({
							queryKey: ["transactions", params.pocketId],
						})

						queryClient.setQueryData(["pockets"], (oldData: ExtendedPocket[]) => {
							return oldData.map((pocket) =>
								pocket.id === params.pocketId
									? { ...pocket, totalSpent: pocket.totalSpent + variables.amount }
									: pocket,
							)
						})
						setIsOpen(false)
						reset()
						const res = await data.json()

						toast(`Transaction ${res?.[0].name} created successfully`)
					},
				},
			)
		}
	}

	useEffect(() => {
		reset({
			isPaid: editingTransaction?.isPaid && false,
			amount: editingTransaction?.amount && undefined,
			name: editingTransaction?.name && undefined,
			description: editingTransaction?.description && undefined,
		})
	}, [reset, editingTransaction])

	return (
		<Modal
			isOpen={isOpen}
			onOpenChange={(isOpen) => {
				setIsOpen(isOpen)
				if (setEditingTransaction) {
					setEditingTransaction(undefined)
				}
				reset()
			}}
		>
			<Modal.Content isBlurred>
				<Modal.Header>
					<Modal.Title>{editingTransaction ? "Edit Expense" : "Add Expense"}</Modal.Title>
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
									value={field.value ?? ""}
									label="Description"
									placeholder="Describe what your expense is about."
								/>
							)}
						/>
						<div className="flex gap-1">
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
							{/* <Controller
								control={control}
								name="currency"
								render={({ field }) => (
									<Select label="Select a language">
										<Select.Trigger />
										<PopoverContent
											showArrow={false}
											respectScreen={false}
											className="min-w-(--trigger-width) overflow-hidden"
										>
											<Autocomplete filter={contains}>
												<div className="border-b bg-muted p-2">
													<SearchField className="rounded-lg bg-bg" autoFocus />
												</div>
												<ListBox className="border-0 shadow-none" items={currencies}>
													{(item) => (
														<Select.Option key={item.iso_code}>{item.name}</Select.Option>
													)}
												</ListBox>
											</Autocomplete>
										</PopoverContent>
									</Select>
								)}
							/> */}
						</div>
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
						<Button type="submit">{editingTransaction ? "Save" : "Add"}</Button>
					</Modal.Footer>
				</Form>
			</Modal.Content>
		</Modal>
	)
}
