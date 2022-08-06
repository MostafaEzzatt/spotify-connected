import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    state?: boolean;
};

// TODOs
// - add security to this route
// - https://stackoverflow.com/questions/68021165/with-next-js-how-can-i-restrict-requests-to-api-routes-to-only-come-from-the-we
// - https://github.com/vercel/next.js/blob/canary/examples/api-routes-cors/pages/api/cors.ts

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id } = req.query;
    console.log(id);
    if (!id) {
        return res.status(400).json({
            state: false,
        });
    }

    try {
        await res.revalidate(`profile/${req.query.id}`);
        return res.json({ state: true });
    } catch (e) {
        return res.json({ state: false });
    }
}
