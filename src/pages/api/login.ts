// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

// utils
import generateRandomString from "../../utils/generateRandomString";

const CLIENT_ID = process.env.CLIENT_ID;
const REDIRECT_URI = process.env.REDIRECT_URI;

type Data = {
    name?: string;
    error?: string;
};

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const state = generateRandomString(); // default length 16
    const spotifyScope = "user-read-private user-read-email";

    if (!CLIENT_ID || typeof CLIENT_ID !== "string")
        return res.status(500).json({ error: "CLIENT_ID is not defined" });

    if (!REDIRECT_URI || typeof REDIRECT_URI !== "string")
        return res.status(500).json({ error: "REDIRECT_URI is not defined" });

    const params = new URLSearchParams({
        client_id: CLIENT_ID,
        response_type: "code",
        redirect_uri: REDIRECT_URI,
        scope: spotifyScope,
        state: state,
    });

    const AUTH_URL = `https://accounts.spotify.com/authorize?${params.toString()}`;

    if (req.method === "GET") {
        res.redirect(AUTH_URL);
    } else {
        res.status(400).json({
            error: "Only GET requests are allowed",
        });
    }
}
