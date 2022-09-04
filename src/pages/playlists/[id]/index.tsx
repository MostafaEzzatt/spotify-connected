import { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
import LoadingFullScreen from "../../../components/LoadingFullScreen";
import PrimaryButton from "../../../components/PrimaryButton";
import ProfileHeader from "../../../components/ProfileHeader";
import withAuth from "../../../components/protected/withAuth";
import SectionTemplate from "../../../components/SectionTemplate";
import Table, { BodyType } from "../../../components/Table";
import getRequests from "../../../spotify/getRequest";
import paths from "../../../spotify/requestPaths";
import spotifySinglePlaylistResponse, {
    playListTrackItem,
    playListTracks,
} from "../../../types/spotifySinglePlaylistResponse";

const List = ({ id }: { id: string }) => {
    const [playlistData, setPlaylistData] =
        useState<spotifySinglePlaylistResponse | null>(null);

    const {
        data: playlist,
        isLoading,
        fetchNextPage,
        isFetching,
        isFetchingNextPage,
        hasNextPage,
    } = useInfiniteQuery(
        ["loadPlaylistTracks"],
        (data) => {
            return getRequests(
                paths.playlist(data.pageParam ? data.pageParam : id)
            );
        },
        {
            getNextPageParam: (lastPage, _allPages) => {
                if (lastPage?.tracks) {
                    return lastPage.tracks.next;
                } else {
                    if (!lastPage.next) return undefined;
                    return lastPage.next;
                }
            },
        }
    );

    useEffect(() => {
        if (!isLoading && playlist) {
            const pages: Array<spotifySinglePlaylistResponse & playListTracks> =
                playlist.pages;

            let allTracks: playListTrackItem[] = [];

            pages.forEach((page) => {
                const getItems = page.tracks ? page.tracks.items : page.items;
                allTracks = allTracks.concat(getItems);
            });

            const result = {
                ...pages[0],
            } as spotifySinglePlaylistResponse;
            // to prevent repeated track object
            result.tracks.items = Array.from(new Set(allTracks));

            setPlaylistData(result);
        }
    }, [isLoading, playlist, playlist?.pages]);

    if (isLoading || playlistData === null) return <LoadingFullScreen />;

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

    const body =
        playlistData &&
        playlistData?.tracks.items.map((item, index) => {
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
        });

    console.log(playlistData.tracks.items.length);

    return (
        <>
            <ProfileHeader profile={playlistData} />
            <div className="container mx-auto flex max-w-screen-lg flex-col items-center gap-y-10 px-6 pt-6 pb-14 2xl:px-0">
                <SectionTemplate
                    title="Playlist Tracks"
                    distenation="/top_tracks"
                >
                    <Table heading={heading} body={body} />
                </SectionTemplate>

                {hasNextPage && (
                    <PrimaryButton
                        clickEven={() => {
                            if (!hasNextPage) return;
                            fetchNextPage();
                        }}
                        disabled={isFetching && isFetchingNextPage}
                        text="Load More"
                    />
                )}
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;
    return {
        props: {
            id,
        },
    };
};
export default withAuth(List);
