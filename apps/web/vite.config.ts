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
		VitePWA({
			registerType: "autoUpdate",
			devOptions: {
				enabled: true,
			},
			strategies: "generateSW",
			// srcDir: "./src",
			//  filename: "service-worker.ts",
			// injectManifest: {
			// 	swDest: "dist/service-worker.js",
			// },
			manifest: {
				name: "Budget Planner",
				short_name: "Budget Planner",
				theme_color: "#020618",
				background_color: "#020618",
				display: "standalone",
				start_url: "/",
			},
		}),
		cloudflare(),
		tailwindcss(),
		TanStackRouterVite({}),
		react(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			// "@api": path.resolve(__dirname, "../api/src"),
			"@hono": path.resolve(__dirname, "../hono/src"),
		},
	},
})
