import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

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
		tailwindcss(),
		TanStackRouterVite({}),
		react(),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@api": path.resolve(__dirname, "../api/src"),
		},
	},
});
