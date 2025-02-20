import type { App } from "@api/index";

import { createEdenTreatyReactQuery } from "@ap0nia/eden-react-query";

export const api = createEdenTreatyReactQuery<App>("localhost:3000");
