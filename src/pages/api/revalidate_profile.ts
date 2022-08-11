import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
    state?: boolean;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { id, key } = req.query;

    if (!id || !key || key !== process.env.SECRET_KEY) {
        return res.status(400).json({
            state: false,
        });
    }

    try {
        await res.revalidate(`/profile/${req.query.id}`);
        return res.json({ state: true });
    } catch (e) {
        return res.json({ state: false });
    }
}
