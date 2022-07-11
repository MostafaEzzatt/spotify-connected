import { createRouter } from "./context";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const defaultUserSelect = Prisma.validator<Prisma.UserSelect>()({
    id: true,
    spotifyId: true,
    displayName: true,
    email: true,
    country: true,
    image: true,
});

export const userRoute = createRouter().mutation("create", {
    input: z.object({
        spotifyId: z.string(),
        displayName: z.string(),
        email: z.string(),
        country: z.string(),
        image: z.string(),
    }),
    async resolve({ ctx, input }) {
        return await ctx.prisma.user.create({
            data: {
                spotifyId: input.spotifyId,
                displayName: input.displayName,
                email: input.email,
                country: input.country,
                image: input.image,
            },
            select: defaultUserSelect,
        });
    },
});
