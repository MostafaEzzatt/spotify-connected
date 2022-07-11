import { createRouter } from "./context";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const defaultProfileSelect = Prisma.validator<Prisma.ProfileSelect>()({
    id: true,
    playlists: true,
    topArtists: true,
    topTracks: true,
});

export const profileRoute = createRouter().mutation("create", {
    input: z.object({
        playlists: z.string(),
        topArtists: z.string(),
        topTracks: z.string(),
        userId: z.string(),
    }),
    async resolve({ ctx, input }) {
        console.log(input);
        return await ctx.prisma.profile.create({
            data: {
                playlists: input.playlists,
                topArtists: input.topArtists,
                topTracks: input.topTracks,
                userId: input.userId,
            },
            select: defaultProfileSelect,
        });
    },
});
