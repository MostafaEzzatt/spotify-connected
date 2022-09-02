import type {
    external_urls,
    followers,
    genres,
    images,
    resonse,
} from "./spotifyAPIResponse";

export default interface artistsResponse extends resonse {
    items: item[];
}

export interface item {
    external_urls: external_urls;
    followers: followers;
    genres: genres;
    href: string;
    id: string;
    images: images[];
    name: string;
    popularity: number;
    type: "artist";
    uri: string;
}
