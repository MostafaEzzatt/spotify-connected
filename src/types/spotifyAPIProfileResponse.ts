import type { external_urls, images } from "./spotifyAPIResponse";

export interface profileResponse {
    country: string;
    display_name: string;
    email: string;
    explicit_content: { filter_enabled: boolean; filter_locked: boolean };
    external_urls: external_urls;
    followers: { href: null | string; total: number };
    href: string;
    id: string;
    images: images[];
    product: string;
    type: "user";
    uri: string;
}
