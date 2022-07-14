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
    profile: true,
    updatedAt: true,
});

export const userRoute = createRouter()
    .query("get", {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ ctx, input }) {
            if (!input.id) return;

            return await ctx.prisma.user.findFirst({
                where: {
                    spotifyId: input.id,
                },
                select: defaultUserSelect,
            });
        },
    })
    .mutation("create", {
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
    })
    .mutation("update", {
        input: z.object({
            id: z.string(),
            spotifyId: z.string(),
            displayName: z.string(),
            email: z.string(),
            country: z.string(),
            image: z.string(),
        }),
        async resolve({ ctx, input }) {
            if (!input.spotifyId) return;

            return await ctx.prisma.user.update({
                where: {
                    id: input.id,
                },
                data: {
                    displayName: input.displayName,
                    email: input.email,
                    country: input.country,
                    image: input.image,
                },
                select: defaultUserSelect,
            });
        },
    });
