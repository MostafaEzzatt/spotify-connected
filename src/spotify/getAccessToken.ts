import { Keys } from "./spotifyLocalStorageKeys";

const LOCALSTORAGE_VALUES: {
    accessToken: string | null;
    refreshToken: string | null;
    expireTime: string | null;
    timestamp: string | null;
} = {
    accessToken: null,
    refreshToken: null,
    expireTime: null,
    timestamp: null,
};

type RouteQueryObjectType = {
    access_token?: string | null;
    refresh_token?: string | null;
    expires_in?: string | null;
};

export const logout = () => {
    // Clear all localStorage items
    for (const property of Object.values(Keys)) {
        if (typeof property !== "string") continue;
        window.localStorage.removeItem(property);
    }
    // Navigate to homepage
    window.location.href = window.location.origin;
};

export const refreshToken = async () => {
    try {
        // Logout if there's no refresh token stored or we've managed to get into a reload infinite loop
        const refreshToken = window.localStorage.getItem(Keys.refreshToken);
        const timestamp = window.localStorage.getItem(Keys.timestamp);
        if (
            !refreshToken ||
            refreshToken === "undefined" ||
            Date.now() - Number(timestamp) / 1000 < 1000
        ) {
            console.error("No refresh token available");
            logout();
        }
        // if (
        //     !LOCALSTORAGE_VALUES.refreshToken ||
        //     LOCALSTORAGE_VALUES.refreshToken === "undefined" ||
        //     Date.now() - Number(LOCALSTORAGE_VALUES.timestamp) / 1000 < 1000
        // ) {
        //     console.error("No refresh token available");
        //     logout();
        // }

        // Use `/refresh_token` endpoint from our Node app
        const requestRefresh = await fetch(
            `/api/refresh_token?refresh_token=${refreshToken}`
        );

        const response = await requestRefresh.json();

        // check if the response is valid
        if (response.data?.error) {
            console.log("found error");
            logout();
            return;
        }

        // Update localStorage values
        window.localStorage.setItem(
            Keys.accessToken,
            response.data.access_token
        );
        window.localStorage.setItem(Keys.timestamp, Date.now().toString());

        // Reload the page for localStorage updates to be reflected
        window.location.reload();
    } catch (e) {
        console.error(e);
    }
};

const hasTokenExpired = () => {
    const { accessToken, timestamp, expireTime } = LOCALSTORAGE_VALUES;

    if (!accessToken || !timestamp) {
        return false;
    }
    const millisecondsElapsed = Date.now() - Number(timestamp);
    return millisecondsElapsed / 1000 > Number(expireTime);
};

export const getSpotifyAccessTokenFromObject = (obj: RouteQueryObjectType) => {
    if (!obj.access_token || !obj.refresh_token || !obj.expires_in)
        return false;

    localStorage.setItem(Keys.accessToken, obj.access_token);
    localStorage.setItem(Keys.expiresIn, obj.expires_in);
    localStorage.setItem(Keys.refreshToken, obj.refresh_token);
    localStorage.setItem(Keys.timestamp, Date.now().toString());

    return obj.access_token;
};

const loadLocalStorageData = () => {
    LOCALSTORAGE_VALUES.accessToken = window.localStorage.getItem(
        Keys.accessToken
    );
    LOCALSTORAGE_VALUES.refreshToken = window.localStorage.getItem(
        Keys.refreshToken
    );
    LOCALSTORAGE_VALUES.expireTime = window.localStorage.getItem(
        Keys.expiresIn
    );
    LOCALSTORAGE_VALUES.timestamp = window.localStorage.getItem(Keys.timestamp);
};

const getSpotifyAccessToken = (RouteQueryObject: RouteQueryObjectType = {}) => {
    // add local storage values to the variable LOCALSTORAGE_VALUES only on client side
    loadLocalStorageData();

    if (Object.keys(RouteQueryObject).length === 0) {
        if (
            hasTokenExpired() ||
            LOCALSTORAGE_VALUES.accessToken === "undefined"
        ) {
            refreshToken();
        }

        if (
            LOCALSTORAGE_VALUES.accessToken &&
            LOCALSTORAGE_VALUES.accessToken !== "undefined"
        )
            return LOCALSTORAGE_VALUES.accessToken;
    } else if (
        typeof RouteQueryObject.access_token !== undefined &&
        typeof RouteQueryObject.refresh_token !== undefined &&
        typeof RouteQueryObject.expires_in !== undefined
    ) {
        return getSpotifyAccessTokenFromObject(RouteQueryObject);
    }
};

export default getSpotifyAccessToken;
