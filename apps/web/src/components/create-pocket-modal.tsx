import { useCreatePocketMutation } from "@/hooks/pockets/useCreatePocketMutation";
import { useEditPocket } from "@/hooks/pockets/useEditPocket";
import { usePockets } from "@/hooks/pockets/usePockets";
import {
	insertPocketSchema,
	type InsertPocketSchemaType,
	type Pocket,
} from "@api/db/types/pocket";
import { typeboxResolver } from "@hookform/resolvers/typebox";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button, Form, Modal, NumberField, TextField } from "./ui";

interface CreatePocketModalProps {
	// isEdit: boolean;
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	editingPocket?: Pocket;
	setEditingPocket?: (editingPocket: Pocket | undefined) => void;
}

export const CreatePocketModal = ({
	editingPocket,
	setEditingPocket,
	isOpen,
	setIsOpen,
}: CreatePocketModalProps) => {
	const { data: pockets } = usePockets();
	const queryClient = useQueryClient();
	const { control, handleSubmit, formState, reset } = useForm({
		resolver: typeboxResolver(insertPocketSchema),
	});
	const createPocketMutation = useCreatePocketMutation();
	const editPocketMutation = useEditPocket();

	const onSubmit = (data: InsertPocketSchemaType) => {
		if (editingPocket) {
			editPocketMutation.mutate(
				{
					data,
					pocketId: editingPocket.id,
				},
				{
					onSuccess(data, variables, context) {
						setIsOpen(false);
						queryClient.invalidateQueries({
							queryKey: ["pockets"],
						});
						setEditingPocket?.(undefined);
						toast(`Pocket ${data.data?.[0].name} updated successfully`);
					},
				},
			);
		} else {
			createPocketMutation.mutate(data, {
				onSuccess(data, variables, context) {
					setIsOpen(false);
					queryClient.invalidateQueries({
						queryKey: ["pockets"],
					});
					toast(`Pocket ${data.data?.[0].name} created successfully`);
				},
			});
		}
	};
	useEffect(() => {
		reset({
			name: editingPocket?.name ?? "",
			description: editingPocket?.description ?? "",
			budget: editingPocket?.budget ?? undefined,
		});
	}, [editingPocket, reset]);

	return (
		<>
			<Modal.Content
				isBlurred
				isOpen={isOpen}
				onOpenChange={(val) => {
					setIsOpen(val);
					setEditingPocket?.(undefined);
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
							render={({ field }) => (
								<TextField {...field} label="Description" />
							)}
						/>
						<Controller
							control={control}
							name="budget"
							render={({ field }) => (
								<NumberField {...field} name="budget" label="Budget" />
							)}
						/>
					</Modal.Body>
					<Modal.Footer>
						<Modal.Close>Close</Modal.Close>

						<Button type="submit">Create</Button>
					</Modal.Footer>
				</Form>
			</Modal.Content>
		</>
	);
};
