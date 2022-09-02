import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingFullScreen from "../../../components/LoadingFullScreen";
import PrimaryButton from "../../../components/PrimaryButton";
import ProfileHeader from "../../../components/ProfileHeader";
import withAuth from "../../../components/protected/withAuth";
import SectionTemplate from "../../../components/SectionTemplate";
import Table, { BodyType } from "../../../components/Table";
import getRequests from "../../../spotify/getRequest";
import paths from "../../../spotify/requestPaths";
import spotifySinglePlaylistResponse, {
    playListTracks,
} from "../../../types/spotifySinglePlaylistResponse";
import catchErrors from "../../../utils/catchError";

const List = () => {
    const { id } = useRouter().query;
    const [playlist, setPlaylist] =
        useState<spotifySinglePlaylistResponse | null>(null);

    const [loading, setLoading] = useState(true);

    const [nextPage, setNextPage] = useState<string | null>(null);
    const [disabled, setDisabled] = useState<boolean>(false);

    const getList = async (path: string = "") => {
        if (!id || typeof id !== "string") return;

        // const listData: spotifySinglePlaylistResponse | playListTracks =
        const listData: any = await getRequests(
            path ? path : paths.playlist(id)
        );

        if (!playlist && "type" in listData) {
            setPlaylist(listData);
            setNextPage(
                listData.tracks.next
                    ? `/${listData.tracks.next?.split("/v1/")[1]}`
                    : null
            );
        } else {
            if ("type" in listData) return;

            const deepCopyList = {
                ...playlist,
            } as spotifySinglePlaylistResponse;
            deepCopyList.tracks.items = [
                ...deepCopyList.tracks.items,
                ...listData.items,
            ];

            setPlaylist(deepCopyList);
            setNextPage(
                listData.next ? `/${listData.next.split("/v1/")[1]}` : null
            );
        }

        if (nextPage) {
            setDisabled(false);
        }
        setLoading(false);
    };

    useEffect(() => {
        catchErrors(getList)();
    }, [id]);

    if (loading) return <LoadingFullScreen />;

    if (!playlist) return <></>;

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

    const body = playlist?.tracks.items.map((item, index) => {
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

    return (
        <>
            <ProfileHeader profile={playlist} />
            <div className="container mx-auto flex max-w-screen-lg flex-col items-center gap-y-10 px-6 pt-6 pb-14 2xl:px-0">
                <SectionTemplate
                    title="Playlist Tracks"
                    distenation="/top_tracks"
                >
                    <Table heading={heading} body={body} />
                </SectionTemplate>
                {nextPage && (
                    <PrimaryButton
                        clickEven={() => {
                            if (!nextPage) return;
                            setDisabled(true);
                            getList(nextPage);
                        }}
                        disabled={disabled}
                        text="Load More"
                    />
                )}
            </div>
        </>
    );
};

export default withAuth(List);
