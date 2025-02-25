import React, { useState } from "react";
import { Button, Checkbox, Form, Modal, NumberField, TextField } from "./ui";
import { Controller, useForm } from "react-hook-form";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import {
	insertTransactionSchema,
	type CreateTransactionSchemaType,
} from "@api/db/types/transaction";
import { useCreateTransactionMutation } from "@/hooks/transactions/useCreateTransactionMutation";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import { IconPlus } from "justd-icons";

export const CreateTransactionModal = () => {
	const params = useParams({ from: "/pocket/$pocketId" });
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { control, handleSubmit, formState, reset } = useForm({
		resolver: typeboxResolver(insertTransactionSchema),
		defaultValues: {
			pocketId: params.pocketId,
			isPaid: false,
		},
	});
	const createTransactionMutation = useCreateTransactionMutation();

	const onSubmit = (data: CreateTransactionSchemaType) => {
		createTransactionMutation.mutate(
			{ ...data, pocketId: params.pocketId },
			{
				onSuccess: (data, variables, context) => {
					setIsModalOpen(false);
					reset();
					queryClient.invalidateQueries({
						queryKey: ["transactions", params.pocketId],
					});
					toast(`Transaction ${data.data?.[0].name} created successfully`);
				},
			},
		);
	};

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
					<Modal.Body>
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
						<Controller
							control={control}
							name="isPaid"
							render={({ field }) => (
								<Checkbox
									{...field}
									onChange={field.onChange}
									isSelected={field.value}
									value="updates"
									name="isPaid"
									label="Is Paid"
									defaultSelected={false}
								/>
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
	);
};
