import { playListTrackItem } from "../types/spotifySinglePlaylistResponse";
import { item } from "../types/spotifyTopTacks";
import { BodyType } from "../types/table";

export default function prepareTablePlaylistBody(
    item: playListTrackItem,
    index: number
) {
    return [
        {
            type: BodyType.TEXT as BodyType.TEXT,
            data: `${index + 1}`,
            hiddenSM: false,
        },
        {
            type: BodyType.IMAGE as BodyType.IMAGE,
            data: item.track.album?.images[0]?.url || "",
            alt: item.track.name,
            hiddenSM: false,
        },
        {
            type: BodyType.TEXT as BodyType.TEXT,
            data: item.track.name,
            hiddenSM: false,
        },
        {
            type: BodyType.ARRAY as BodyType.ARRAY,
            data: item.track.artists.map((artist) => {
                return {
                    name: artist.name,
                };
            }),
            hiddenSM: true,
        },
        {
            type: BodyType.NUMBER as BodyType.NUMBER,
            data: item.track.duration_ms,
            hiddenSM: false,
        },
        {
            type: BodyType.LINK as BodyType.LINK,
            data: item.track.external_urls.spotify,
            hiddenSM: false,
        },
    ];
}

export function prepareTableTopTracksBody(track: item, index: number) {
    return [
        {
            type: BodyType.TEXT as BodyType.TEXT,
            data: `${index + 1}`,
            hiddenSM: false,
        },
        {
            type: BodyType.IMAGE as BodyType.IMAGE,
            data: track.album?.images[0]?.url || "",
            alt: track.name,
            hiddenSM: false,
        },
        {
            type: BodyType.TEXT as BodyType.TEXT,
            data: track.name,
            hiddenSM: false,
        },
        {
            type: BodyType.ARRAY as BodyType.ARRAY,
            data: track.artists.map((artist) => {
                return {
                    name: artist.name,
                };
            }),
            hiddenSM: true,
        },
        {
            type: BodyType.NUMBER as BodyType.NUMBER,
            data: track.duration_ms,
            hiddenSM: false,
        },
        {
            type: BodyType.LINK as BodyType.LINK,
            data: track.external_urls.spotify,
            hiddenSM: false,
        },
    ];
}
