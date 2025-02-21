import type { CreatePocketSchemaType } from "@api/db/types/pocket";
import { Button, Form, Modal, NumberField, TextField } from "./ui";
import { useCreatePocketMutation } from "@/hooks/pockets/useCreatePocketMutation";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

export const CreatePocketModal = () => {
	const { control, handleSubmit } = useForm<CreatePocketSchemaType>({});
	const createPocketMutation = useCreatePocketMutation();

	const onSubmit = (data: CreatePocketSchemaType) => {
		createPocketMutation.mutate(data, {
			onSuccess(data, variables, context) {
				toast(`Pocket ${data.data?.[0].name} created successfully`);
			},
		});
	};

	return (
		<Modal>
			<Button>Create Pocket</Button>
			<Modal.Content>
				<Modal.Header>
					<Modal.Title>Create Pocket</Modal.Title>
					<Modal.Description>
						To be able to manage your budgets, you need to create a pocket.
					</Modal.Description>
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
									placeholder="Wedding, Honeymoon, Holiday, etc"
								/>
							)}
						/>
						<Controller
							control={control}
							name="description"
							render={({ field }) => (
								<TextField {...field} label="Description" />
							)}
						/>
						<Controller
							control={control}
							name="budget"
							render={({ field }) => (
								<NumberField
									{...field}
									isRequired
									name="budget"
									label="Budget"
								/>
							)}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Modal.Close>Close</Modal.Close>

						<Button type="submit">Create</Button>
					</Modal.Footer>
				</Form>
			</Modal.Content>
		</Modal>
	);
};
