import {
    external_urls,
    followers,
    images,
    owner,
    resonse,
} from "./spotifyAPIResponse";

import { item } from "./spotifyTopTacks";

export default interface spotifySinglePlaylistResponse extends resonse {
    collaborative: boolean;
    description: string;
    external_urls: external_urls;
    followers: followers;
    id: string;
    images: images[];
    name: string;
    owner: playListOwner;
    public: true;
    snapshot_id: string;
    tracks: playListTracks;
    type: "playlist";
    uri: string;
}

interface playListTrackItem {
    added_at: string;
    added_by: {
        external_urls: external_urls;
        href: string;
        id: string;
        type: "user";
        uri: string;
    };
    is_local: boolean;
    primary_color: string | null;
    track: item;
    video_thumbnail: { url: string | null };
}

interface playListOwner extends owner {
    followers: followers;
}

export interface playListTracks {
    href: string;
    items: playListTrackItem[];
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
}
