// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Buffer } from "node:buffer";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

type Data = {
    code: number;
    message: string;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { code, state } = req.query;

    if (
        !code ||
        typeof code !== "string" ||
        !state ||
        typeof state !== "string"
    )
        return res.status(400).json({ code: 400, message: "Invalid request" });

    const headrs = new Headers();
    headrs.append("Content-Type", "application/x-www-form-urlencoded");
    headrs.append(
        "Authorization",
        `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
            "base64"
        )}`
    );

    try {
        const getAccessToken = await fetch(
            "https://accounts.spotify.com/api/token",
            {
                method: "POST",
                headers: headrs,
                body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}`,
            }
        );

        const accessToken = await getAccessToken.json();
        if (!accessToken.access_token)
            return res
                .status(400)
                .json({ code: 400, message: "Missing access_token" });

        const redirectParams = new URLSearchParams({
            access_token: accessToken.access_token,
            token_type: accessToken.token_type,
            expires_in: accessToken.expires_in,
            refresh_token: accessToken.refresh_token,
        });

        return res.redirect(`/?${redirectParams.toString()}`);
    } catch (e: any) {
        const error: string = e.message || e.code;
        return res.redirect(`/?error=${error}`);
    }
}
