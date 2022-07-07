import type {
    available_markets,
    external_urls,
    images,
    resonse,
    album,
} from "./spotifyAPIResponse";

export default interface topTracksResponse extends resonse {
    items: item[];
}

interface item {
    album: album;
    artists: images[];
    available_markets: available_markets;
    disc_number: number;
    duration_ms: number;
    explicit: boolean;
    external_ids: { isrc: string };
    external_urls: { spotify: string };
    href: string;
    id: string;
    is_local: false;
    name: string;
    popularity: number;
    preview_url: string;
    track_number: number;
    type: "track";
    uri: string;
}
