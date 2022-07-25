import Link from "next/link";
import { useQuery } from "react-query";
import getRequests from "../spotify/getRequest";
import paths from "../spotify/requestPaths";
import playListResponse from "../types/playListResponse";
import CardsList from "./cards";
import CustomeImage from "./CustomeImage";
import Loading from "./Loading";
import SectionTemplate from "./SectionTemplate";

const Playlists = () => {
    const { data, isLoading, isError, status } = useQuery(["playlists"], () =>
        getRequests(paths.playlists)
    );

    if (isLoading) return <Loading />;

    if (isError)
        return (
            <div className="rounded bg-slate-700 py-3 text-center text-lg font-bold text-gray-200">
                Something Went Wrong
            </div>
        );

    if (status !== "success") return <Loading />;

    return (
        <SectionTemplate title="Top Artists" distenation="/top_artists">
            <CardsList data={data} showLength={8} />
        </SectionTemplate>
    );
};

export default Playlists;
