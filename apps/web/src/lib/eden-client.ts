import type { App } from "@api/index";
import { treaty } from "@elysiajs/eden";

export const api = treaty<App>("localhost:3000");
