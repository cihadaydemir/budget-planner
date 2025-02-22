import React, { useState } from "react";
import { Button, Form, Modal, NumberField, TextField } from "./ui";
import { Controller, useForm } from "react-hook-form";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import {
	insertTransactionSchema,
	type CreateTransactionSchemaType,
} from "@api/db/types/transaction";

export const CreateTransactionModal = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { control, handleSubmit } = useForm({
		resolver: typeboxResolver(insertTransactionSchema),
	});
	const onSubmit = (data: CreateTransactionSchemaType) => {};

	return (
		<Modal isOpen={isModalOpen} onOpenChange={setIsModalOpen}>
			<Button>Create Transaction</Button>
			<Modal.Content isBlurred>
				<Modal.Header>
					<Modal.Title>Create Transaction</Modal.Title>
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
					</Modal.Body>
				</Form>
				<Modal.Footer>
					<Modal.Close>Cancel</Modal.Close>
					<Button type="submit">Create</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal>
	);
};
