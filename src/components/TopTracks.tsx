import { useEffect } from "react";
import { useQuery } from "react-query";
import { useAppContext } from "../context";
import getRequests from "../spotify/getRequest";
import paths from "../spotify/requestPaths";
import topTracksResponse from "../types/spotifyTopTacks";
import { BodyType } from "../types/table";
import { prepareTableTopTracksBody } from "../utils/prepareTableBody";
import Loading from "./Loading";
import SectionTemplate from "./SectionTemplate";
import Table from "./Table";

const TopTracks = () => {
    const { data, isError, status } = useQuery<topTracksResponse>(
        ["topTracks"],
        () => getRequests(paths.topTracksShort)
    );

    const { setTopTracks } = useAppContext();

    useEffect(() => {
        if (data) {
            setTopTracks(data);
        }
    }, [data, setTopTracks]);

    if (isError)
        return (
            <div className="rounded bg-slate-700 py-3 text-center text-lg font-bold text-gray-200">
                Something Went Wrong
            </div>
        );

    if (status !== "success" || !Array.isArray(data.items)) return <Loading />;

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

    const body = data?.items.slice(0, 8).map(prepareTableTopTracksBody);

    return (
        <SectionTemplate title="Top Tracks" distenation="/top_tracks">
            <Table heading={heading} body={body} />
        </SectionTemplate>
    );
};

export default TopTracks;
