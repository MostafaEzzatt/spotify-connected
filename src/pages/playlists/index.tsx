import { useEffect, useState } from "react";
import CardsList from "../../components/cards";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import PrimaryButton from "../../components/PrimaryButton";
import withAuth from "../../components/protected/withAuth";
import SectionTemplate from "../../components/SectionTemplate";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";
import playListResponse from "../../types/playListResponse";
import catchErrors from "../../utils/catchError";

const Playlist = () => {
    const [playlistData, setPlaylistData] = useState<playListResponse | null>(
        null
    );
    const [next, setNext] = useState<string | null>(null);
    const [forceLoad, setForceLoad] = useState<boolean>(false);

    const getPlayLists = async (path: string = "") => {
        const request: playListResponse = await getRequests(
            path ? path : paths.playlists
        );

        if (!playlistData) {
            setPlaylistData(request);
        } else {
            const newPlayLists = { ...playlistData };
            newPlayLists.items = [...newPlayLists.items, ...request.items];
            newPlayLists.href = request.href;
            setPlaylistData(newPlayLists);
        }

        const nextIsNull = request.next
            ? `/${request.next?.split("/v1/")[1]}`
            : null;

        setNext(nextIsNull);
    };

    useEffect(() => {
        catchErrors(getPlayLists)();
    }, []);

    if (!playlistData) return <LoadingFullScreen />;

    return (
        <>
            <div className="container mx-auto flex max-w-screen-lg flex-col gap-y-10 px-6 pt-6 pb-14 2xl:px-0">
                <SectionTemplate title="Playlists" distenation="/top_artists">
                    <CardsList data={playlistData} showLength={0} />
                </SectionTemplate>

                {playlistData.items.length !== playlistData.total && (
                    <PrimaryButton
                        text="Load More"
                        disabled={next ? false : true}
                        clickEven={() => {
                            if (!next) return;
                            getPlayLists(next);
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default withAuth(Playlist);
