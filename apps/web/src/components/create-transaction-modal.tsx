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

export const CreateTransactionModal = () => {
	const params = useParams({ from: "/pocket/$pocketId" });
	const queryClient = useQueryClient();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { control, handleSubmit, formState } = useForm({
		resolver: typeboxResolver(insertTransactionSchema),
	});
	const createTransactionMutation = useCreateTransactionMutation();

	const onSubmit = (data: CreateTransactionSchemaType) => {
		console.log("pocketId", params.pocketId);
		createTransactionMutation.mutate(
			{ ...data, pocketId: params.pocketId },
			{
				onSuccess: (data, variables, context) => {
					setIsModalOpen(false);
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
			<Button>Create Transaction</Button>
			<Modal.Content isBlurred>
				<Modal.Header>
					<Modal.Title>Create Transaction</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit(onSubmit)}>
					<Modal.Body>
						{JSON.stringify(formState.errors)}
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
									placeholder="Describe what your transaction is about."
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
						<Button type="submit">Create</Button>
					</Modal.Footer>
				</Form>
			</Modal.Content>
		</Modal>
	);
};
