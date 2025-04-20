import { Loader } from "@/client/components/ui"

export const LoadingScreen = () => {
	return (
		<div className="flex h-full items-center justify-center">
			<Loader variant="ring" />
		</div>
	)
}
