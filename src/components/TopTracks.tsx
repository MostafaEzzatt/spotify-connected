import topTracksResponse from "../types/spotifyTopTacks";
import Table, { BodyType } from "./Table";

type Props = {
    tracks: topTracksResponse | null;
    show: number;
};

const TopTracks = (props: Props) => {
    const { tracks, show } = props;

    if (!tracks) return <></>;
    if (tracks.items.length === 0) return <></>;

    const heading = [
        {
            text: "#",
            hiddenSM: false,
        },
        {
            text: "Image",
            hiddenSM: false,
        },
        {
            text: "Name",
            hiddenSM: false,
        },
        {
            text: "Artist(s)",
            hiddenSM: true,
        },
        {
            text: "Duration",
            hiddenSM: false,
        },
        {
            text: "link",
            hiddenSM: false,
        },
    ];

    const body = tracks?.items
        .slice(0, show || tracks.items.length)
        .map((track, index) => {
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
        });

    return <Table heading={heading} body={body} />;
};

export default TopTracks;
