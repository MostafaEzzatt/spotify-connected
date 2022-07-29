import React, { useEffect } from "react";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import Playlists from "../../components/Playlists";
import withAuth from "../../components/protected/withAuth";
import SectionTemplate from "../../components/SectionTemplate";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";
import playListResponse from "../../types/playListResponse";
import catchErrors from "../../utils/catchError";
import getUrlParam from "../../utils/getUrlParam";

const Playlist = () => {
    // const [playlistData, setPlaylistData] =
    //     React.useState<playListResponse | null>(null);

    // const [next, setNext] = React.useState<string | null>(null);
    // const [loading, setLoading] = React.useState(true);

    // useEffect(() => {
    //     const getList = async () => {
    //         const playlistsData = await getRequests(paths.playlists);

    //         setPlaylistData(playlistsData);
    //         setNext(playlistsData.next);
    //         setLoading(false);
    //     };
    //     catchErrors(getList)();
    // }, []);

    // const loadMore = async () => {
    //     if (!next) return;

    //     const offset = getUrlParam(next, "offset");
    //     const nextRequest = await getRequests(
    //         `${paths.playlists}?&offset=${offset}`
    //     );

    //     if (nextRequest.error) return;

    //     setNext(nextRequest.next);

    //     if (typeof playlistData !== undefined && typeof playlistData !== null) {
    //         setPlaylistData((old) => {
    //             let newData = {};
    //             if (old !== null) {
    //                 newData = {
    //                     ...old,
    //                     items: [...old.items, ...nextRequest.items],
    //                 };
    //                 return newData;
    //             }

    //             return nextRequest;
    //         });
    //     }
    // };

    // if (loading) return <LoadingFullScreen />;
    return (
        <>
            <div className="container mx-auto flex max-w-screen-lg flex-col gap-y-10 px-6 pt-6 2xl:px-0"></div>
        </>
    );
};

export default withAuth(Playlist);
