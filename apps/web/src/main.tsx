import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import ReactDOM from "react-dom/client";
import { routeTree } from "./routeTree.gen";

import "./index.css";
import { authClient, type Session } from "./lib/auth-client";
import React from "react";

const queryClient = new QueryClient();

export interface AuthContext {
	session: Session | null;
}

// Set up a Router instance
const router = createRouter({
	routeTree,
	context: {
		auth: {
			session: null,
		},
	},
	defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

function App() {
	const { data } = authClient.useSession();
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider
				router={router}
				context={{ auth: data ? { session: data } : { session: null } }}
			/>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}
const rootElement = document.getElementById("app")!;

if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);

	root.render(
		<React.StrictMode>
			<App />
		</React.StrictMode>,
	);
}
