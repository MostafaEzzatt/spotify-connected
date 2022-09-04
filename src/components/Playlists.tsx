import { useEffect } from "react";
import { useQuery } from "react-query";
import { useAppContext } from "../context";
import getRequests from "../spotify/getRequest";
import paths from "../spotify/requestPaths";
import CardsList from "./cards";
import Loading from "./Loading";
import SectionTemplate from "./SectionTemplate";

const Playlists = () => {
    const { data, isError, status } = useQuery(["playlists"], () =>
        getRequests(paths.playlists())
    );

    const { setPlayLists } = useAppContext();

    useEffect(() => {
        if (data) {
            setPlayLists(data);
        }
    }, [data, setPlayLists]);

    if (isError)
        return (
            <div className="rounded bg-slate-700 py-3 text-center text-lg font-bold text-gray-200">
                Something Went Wrong
            </div>
        );

    if (status !== "success") return <Loading />;

    return (
        <SectionTemplate title="Playlists" distenation="/top_artists">
            <CardsList data={data} showLength={8} />
        </SectionTemplate>
    );
};

export default Playlists;
