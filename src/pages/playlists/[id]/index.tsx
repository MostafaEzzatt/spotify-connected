import { GetServerSideProps } from "next";
import { useInfiniteQuery } from "react-query";
import LoadingFullScreen from "../../../components/LoadingFullScreen";
import PrimaryButton from "../../../components/PrimaryButton";
import ProfileHeader from "../../../components/ProfileHeader";
import withAuth from "../../../components/protected/withAuth";
import SectionTemplate from "../../../components/SectionTemplate";
import Table from "../../../components/Table";
import getRequests from "../../../spotify/getRequest";
import paths from "../../../spotify/requestPaths";
import { bodyArray } from "../../../types/table";
import prepareTablePlaylistBody from "../../../utils/prepareTableBody";

const List = ({ id }: { id: string }) => {
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

    console.log(playlist);

    if (isLoading) return <LoadingFullScreen />;

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

    const body = playlist?.pages
        .map((page) => {
            return page.tracks
                ? page.tracks.items.map(prepareTablePlaylistBody)
                : page.items.map(prepareTablePlaylistBody);
        })
        .reduce((prev, curr) => [...prev, ...curr]) as bodyArray[];

    return (
        <>
            {playlist?.pages && playlist?.pages.length >= 0 && (
                <ProfileHeader profile={playlist?.pages[0]} />
            )}
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
