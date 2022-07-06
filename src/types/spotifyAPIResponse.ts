export interface resonse {
    href: string;
    // items: item[];
    limit: number;
    next: null | string;
    offset: number;
    previous: null | string;
    total: number;
}

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

export interface followers {
    href: null | string;
    total: number;
}

export type genres = string[];
