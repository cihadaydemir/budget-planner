import { RouterProvider, createRouter } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./index.css";
import { Providers } from "./components/providers";

const queryClient = new QueryClient();

// Set up a Router instance
const router = createRouter({
	routeTree,
	defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<Providers>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
				<ReactQueryDevtools initialIsOpen={false} />
			</QueryClientProvider>
		</Providers>,
	);
}
