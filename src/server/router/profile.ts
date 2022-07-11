import { createRouter } from "./context";
import { z } from "zod";

export const profile = createRouter().mutation("create", {
    input: z.object({
        playlists: z.string(),
        topArtists: z.string(),
        topTracks: z.string(),
    }),
    resolve({ ctx, input }) {
        return ctx.prisma.profile.create({
            data: {
                playlists: input.playlists,
                topArtists: input.topArtists,
                topTracks: input.topTracks,
            },
        });
    },
});
