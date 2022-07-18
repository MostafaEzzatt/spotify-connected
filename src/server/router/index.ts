// src/server/router/index.ts
import superjson from "superjson";
import { createRouter } from "./context";

// Routes
import { exampleRouter } from "./example";
import { profileRoute } from "./profile";
import { userRoute } from "./user";

export const appRouter = createRouter()
    .transformer(superjson)
    .merge("example.", exampleRouter)
    .merge("profile.", profileRoute)
    .merge("user.", userRoute);

// export type definition of API
export type AppRouter = typeof appRouter;
