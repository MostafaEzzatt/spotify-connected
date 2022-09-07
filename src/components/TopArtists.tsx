import { useEffect } from "react";
import { useQuery } from "react-query";
import { useAppContext } from "../context";
import getRequests from "../spotify/getRequest";
import paths from "../spotify/requestPaths";
import CardsList from "./cards";
import SectionTemplate from "./SectionTemplate";
import Loading from "./svgs/Loading";

const TopArtists = () => {
    const { data, isError, status } = useQuery(["topArtists"], () =>
        getRequests(paths.topArtistsShort)
    );

    const { setTopArtists } = useAppContext();

    useEffect(() => {
        if (data) {
            setTopArtists(data);
        }
    }, [data, setTopArtists]);

    if (isError)
        return (
            <div className="rounded bg-slate-700 py-3 text-center text-lg font-bold text-gray-200">
                Something Went Wrong
            </div>
        );

    if (status !== "success") return <Loading />;

    return (
        <SectionTemplate title="Top Artists" distenation="/artists" seeMore>
            <CardsList data={data} showLength={8} />
        </SectionTemplate>
    );
};

export default TopArtists;
