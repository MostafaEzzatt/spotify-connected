import { useQuery } from "react-query";
import getRequests from "../spotify/getRequest";
import paths from "../spotify/requestPaths";
import topTracksResponse from "../types/spotifyTopTacks";
import Loading from "./Loading";
import SectionTemplate from "./SectionTemplate";
import Table, { BodyType } from "./Table";

const TopTracks = () => {
    const { data, isLoading, isError, status } = useQuery<topTracksResponse>(
        ["topTracks"],
        () => getRequests(paths.topTracksShort)
    );

    if (isLoading) return <Loading />;

    if (isError)
        return (
            <div className="rounded bg-slate-700 py-3 text-center text-lg font-bold text-gray-200">
                Something Went Wrong
            </div>
        );

    if (status !== "success") return <Loading />;

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

    const body = data?.items.slice(0, 8).map((track, index) => {
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

    return (
        <SectionTemplate title="Top Tracks" distenation="/top_tracks">
            <Table heading={heading} body={body} />
        </SectionTemplate>
    );
};

export default TopTracks;
