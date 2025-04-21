import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import { VitePWA } from "vite-plugin-pwa"
import { cloudflare } from "@cloudflare/vite-plugin"
import { defineConfig } from "vite"
import path from "node:path"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		cloudflare(),
		// VitePWA({
		// 	registerType: "autoUpdate",
		// 	devOptions: {
		// 		enabled: true,
		// 	},
		// 	strategies: "generateSW",
		// 	workbox: {
		// 		cleanupOutdatedCaches: true,
		// 	},
		// 	manifest: {
		// 		name: "Budget Planner",
		// 		short_name: "Budget Planner",
		// 		theme_color: "#020618",
		// 		background_color: "#020618",
		// 		display: "standalone",
		// 		start_url: "/",
		// 	},
		// }),
		TanStackRouterVite({
			target: "react",
			autoCodeSplitting: true,
			routesDirectory: "./src/client/routes",
			generatedRouteTree: "./src/client/routeTree.gen.ts",
		}),
		react(),
		tailwindcss(),
	],
	server: {
		port: 3000,
		strictPort: true,
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})
