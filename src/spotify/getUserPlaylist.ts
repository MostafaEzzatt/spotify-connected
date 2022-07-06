import { Keys } from "./spotifyLocalStorageKeys";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const getUserPlaylist = async () => {
    const request_url = `${BASE_URL}/me/playlists`;

    const accessToken = localStorage.getItem(Keys.accessToken);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${accessToken}`);

    if (!accessToken) return false;

    const request = await fetch(request_url, {
        method: "GET",
        headers,
    });

    return await request.json();
};

export default getUserPlaylist;
