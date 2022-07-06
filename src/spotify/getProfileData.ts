import { Keys } from "./spotifyLocalStorageKeys";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getProfileData = async () => {
    const request_url = `${BASE_URL}/me`;
    const accessToken = localStorage.getItem(Keys.accessToken);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${accessToken}`);

    if (!accessToken) return false;

    const request = await fetch(request_url, {
        method: "GET",
        headers,
    });

    const response = await request.json();

    return response;
};

export default getProfileData;
