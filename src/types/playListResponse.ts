import type {
    resonse,
    images,
    owner,
    external_urls,
} from "./spotifyAPIResponse";

export default interface playListResponse extends resonse {
    items: item[];
}

export type item = {
    collaborative: boolean;
    description: string;
    external_urls: external_urls;
    href: string;
    id: string;
    images: images[];
    name: string;
    owner: owner;
    primary_color: null;
    public: boolean;
    snapshot_id: string;
    tracks: { href: string; total: number };
    type: "playlist";
    uri: string;
};
