import getSpotifyAccessToken, { refreshToken } from "./getAccessToken";
import requestHeaders from "./requestHeaders";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getRequests = async (path: string) => {
    const request_url = `${BASE_URL}${path}`;
    const { accessToken, headers } = requestHeaders();

    if (!accessToken) return false;

    const request = await fetch(request_url, {
        method: "GET",
        headers,
    });

    const response = await request.json();
    if (response.error?.status === 401) {
        refreshToken();
    }

    return response;
};

export default getRequests;
