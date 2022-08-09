import { Prisma } from "@prisma/client";
import { z } from "zod";
import { createRouter } from "./context";

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
    .mutation("get", {
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
    })
    .mutation("revalidateProfile", {
        input: z.object({
            id: z.string(),
        }),
        async resolve({ ctx, input }) {
            if (!input.id) return;
            console.log(`profile id: ${input.id}`, process.env.SECRET_KEY);
            console.log(
                `${process.env.URL_ORIGIN}/api/revalidate_profile?id=${input.id}&key=${process.env.SECRET_KEY}`
            );
            await fetch(
                `${process.env.URL_ORIGIN}/api/revalidate_profile?id=${input.id}&key=${process.env.SECRET_KEY}`
            );
        },
    });
