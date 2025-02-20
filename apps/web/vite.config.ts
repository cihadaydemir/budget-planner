import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import path from "node:path";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [tailwindcss(), TanStackRouterVite({}), react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@api": path.resolve(__dirname, "../api/src"),
		},
	},
});
