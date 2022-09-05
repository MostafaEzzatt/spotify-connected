import { playListTrackItem } from "../types/spotifySinglePlaylistResponse";
import { BodyType } from "../types/table";

export default function prepareTableBody(
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
