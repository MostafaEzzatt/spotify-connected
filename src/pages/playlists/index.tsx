import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import CardsList from "../../components/cards";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import PrimaryButton from "../../components/PrimaryButton";
import withAuth from "../../components/protected/withAuth";
import SectionTemplate from "../../components/SectionTemplate";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";
import playListResponse, { item } from "../../types/playListResponse";

const Playlist = () => {
    const [playlistData, setPlaylistData] = useState<playListResponse | null>(
        null
    );

    const {
        data: playlists,
        isLoading,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ["loadPlaylists"],
        (data) => {
            return getRequests(paths.playlists(data.pageParam));
        },
        {
            getNextPageParam: (lastPage, _allPages) => {
                if (!lastPage.next) return undefined;
                return lastPage.next || undefined;
            },
        }
    );

    useEffect(() => {
        if (!isLoading && !isFetching && !isFetchingNextPage) {
            const pages = playlists?.pages as Array<playListResponse>;

            if (Array.isArray(pages)) {
                let allItems: item[] = [];

                pages.forEach((page) => {
                    allItems = allItems.concat(page.items);
                });

                const result = {
                    ...pages[pages.length - 1],
                } as playListResponse;
                result.items = allItems;

                setPlaylistData(result);
            }
        }
    }, [isFetching, isFetchingNextPage, isLoading, playlists?.pages]);

    if (isLoading) return <LoadingFullScreen />;
    if (!playlistData) return <></>;

    return (
        <>
            <div className="container mx-auto flex max-w-screen-lg flex-col items-center gap-y-10 px-6 pt-6 pb-14 2xl:px-0">
                <SectionTemplate title="Playlists" distenation="/top_artists">
                    <CardsList data={playlistData} showLength={0} />
                </SectionTemplate>

                {playlistData.items.length !== playlistData.total && (
                    <PrimaryButton
                        text="Load More"
                        disabled={isFetching || isFetchingNextPage}
                        clickEven={() => {
                            fetchNextPage();
                        }}
                    />
                )}
            </div>
        </>
    );
};

export default withAuth(Playlist);
