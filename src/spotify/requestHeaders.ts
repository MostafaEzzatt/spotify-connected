import { Keys } from "./spotifyLocalStorageKeys";

const requestHeaders = () => {
    const accessToken = localStorage.getItem(Keys.accessToken);

    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${accessToken}`);

    return { accessToken, headers };
};

export default requestHeaders;
