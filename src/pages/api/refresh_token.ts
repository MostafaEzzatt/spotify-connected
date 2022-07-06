// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;

type data = {
    access_token: string;
    token_type: "Bearer";
    expires_in: number;
    scope: string;
};

type Data = {
    code?: number;
    message?: string;
    data?: data;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.method !== "GET")
        return res
            .status(400)
            .json({ code: 400, message: "This Method Not Supported" });

    const { refresh_token } = req.query;

    if (!refresh_token || typeof refresh_token !== "string")
        return res
            .status(400)
            .json({ code: 400, message: "Missing refresh_token" });

    const AUTH_URL = `https://accounts.spotify.com/api/token`;

    try {
        const headers = new Headers();
        headers.append("Content-Type", "application/x-www-form-urlencoded");
        headers.append(
            "Authorization",
            `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
                "base64"
            )}`
        );

        const body = new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token,
        }).toString();

        const request = await fetch(AUTH_URL, {
            method: "POST",
            headers,
            body,
        });

        const response: data = await request.json();

        return res.status(200).json({
            code: 200,
            message: "Success",
            data: response,
        });
    } catch (e: any) {
        const error = e.message || "Something went wrong";
        error.message;
        res.status(500).json({ code: 500, message: error });
    }
}
