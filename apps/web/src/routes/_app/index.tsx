import { Button, Heading } from "@/components/ui"

import { CreatePocketModal } from "@/components/create-pocket-modal"
import { IconPlus } from "justd-icons"
import type { Pocket } from "@hono/db/zod"
import { PocketsCard } from "@/components/pockets-card"
import { createFileRoute } from "@tanstack/react-router"
import { usePockets } from "@/hooks/pockets/usePockets"
import { useState } from "react"

export const Route = createFileRoute("/_app/")({
	component: HomeComponent,
})

function HomeComponent() {
	const { data: pockets, error, isLoading } = usePockets()
	const [isOpen, setIsOpen] = useState(false)
	const [editingPocket, setEditingPocket] = useState<Pocket>()

	if (!pockets || pockets.length === 0) {
		return (
			<div className="flex h-full flex-col items-center justify-center gap-3">
				<p>Seems like you don't have any pockets yet.</p>
				<div className="">
					<Button onPress={() => setIsOpen(true)}>
						<IconPlus />
						Create Pocket
					</Button>
					<CreatePocketModal isOpen={isOpen} setIsOpen={setIsOpen} />
				</div>
			</div>
		)
	}

	return (
		<div className="flex h-full w-full flex-col gap-3 py-4">
			<div className="flex justify-between">
				<Heading level={1}>Pockets</Heading>
				<div className="hidden md:block">
					<Button onPress={() => setIsOpen(true)}>
						<IconPlus />
						Create Pocket
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-2">
				{pockets.map((pocket) => (
					<PocketsCard
						key={pocket.id}
						pocket={pocket}
						isOpen={isOpen}
						setIsOpen={setIsOpen}
						setEditingPocket={setEditingPocket}
					/>
				))}
			</div>
			<div className="fixed bottom-10 z-10 mt-auto self-center md:hidden">
				<Button onPress={() => setIsOpen(true)}>
					<IconPlus />
					Create Pocket
				</Button>
			</div>
			<CreatePocketModal
				isOpen={isOpen}
				setIsOpen={setIsOpen}
				editingPocket={editingPocket}
				setEditingPocket={setEditingPocket}
			/>
		</div>
	)
}
