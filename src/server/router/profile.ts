import { createRouter } from "./context";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const defaultProfileSelect = Prisma.validator<Prisma.ProfileSelect>()({
    id: true,
    playlists: true,
    topArtists: true,
    topTracks: true,
});

export const profile = createRouter().mutation("create", {
    input: z.object({
        playlists: z.string(),
        topArtists: z.string(),
        topTracks: z.string(),
    }),
    async resolve({ ctx, input }) {
        return await ctx.prisma.profile.create({
            data: {
                playlists: input.playlists,
                topArtists: input.topArtists,
                topTracks: input.topTracks,
            },
            select: defaultProfileSelect,
        });
    },
});
