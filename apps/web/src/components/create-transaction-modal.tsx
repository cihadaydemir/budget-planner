import { useCreateTransactionMutation } from "@/hooks/transactions/useCreateTransactionMutation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQueryClient } from "@tanstack/react-query"
import { useParams } from "@tanstack/react-router"
import { IconPlus } from "justd-icons"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button, Checkbox, Form, Label, Modal, NumberField, PopoverContent, Switch, TextField } from "./ui"
import { insertTransactionSchema, type InsertTransactionSchemaType, type ExtendedPocket } from "@hono/db/zod"
import { Select } from "./ui/select"
import { ListBox } from "./ui/list-box"
import { Autocomplete, useFilter } from "react-aria-components"
import { SearchField } from "./ui/search-field"
import { currencies } from "@/lib/currencies"

export const CreateTransactionModal = () => {
	const params = useParams({ from: "/_app/pocket/$pocketId" })
	const queryClient = useQueryClient()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const { contains } = useFilter({ sensitivity: "base" })
	const { control, handleSubmit, reset } = useForm({
		resolver: zodResolver(insertTransactionSchema),
		defaultValues: {
			pocketId: params.pocketId,
			isPaid: false,
		},
	})

	const createTransactionMutation = useCreateTransactionMutation()

	const onSubmit = (data: InsertTransactionSchemaType) => {
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
					setIsModalOpen(false)
					reset()
					const res = await data.json()

					toast(`Transaction ${res?.[0].name} created successfully`)
				},
			},
		)
	}

	return (
		<Modal
			isOpen={isModalOpen}
			onOpenChange={(isOpen) => {
				setIsModalOpen(isOpen)
				reset()
			}}
		>
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
							<Controller
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
													{(item) => <Select.Option>{item.name}</Select.Option>}
												</ListBox>
											</Autocomplete>
										</PopoverContent>
									</Select>
								)}
							/>
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
						<Button type="submit">Add</Button>
					</Modal.Footer>
				</Form>
			</Modal.Content>
		</Modal>
	)
}
