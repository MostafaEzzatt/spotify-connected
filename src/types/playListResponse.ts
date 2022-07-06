export default interface PlayListResponse {
    ref: string;
    items: item[];
    limit: number;
    next: null | string;
    offset: number;
    previous: null | string;
    total: number;
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

export type external_urls = { spotify: string };
export type images = { height: number; url: string; width: number };

export interface owner {
    display_name: string;
    external_urls: external_urls;
    href: string;
    id: string;
    type: string;
    uri: string;
}
