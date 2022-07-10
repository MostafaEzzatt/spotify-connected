import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomeImage from "../../../components/CustomeImage";
import LoadingFullScreen from "../../../components/LoadingFullScreen";
import ProfileHeader from "../../../components/ProfileHeader";
import SectionTemplate from "../../../components/SectionTemplate";
import getRequests from "../../../spotify/getRequest";
import paths from "../../../spotify/requestPaths";
import spotifySinglePlaylistResponse from "../../../types/spotifySinglePlaylistResponse";
import catchErrors from "../../../utils/catchError";
import convertSecondsToTime from "../../../utils/convertSecondsToTime";

const List = () => {
    const { id } = useRouter().query;
    const [playlist, setPlaylist] =
        useState<spotifySinglePlaylistResponse | null>(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getList = async () => {
            if (!id || typeof id !== "string") return;

            const listData = await getRequests(paths.playlist(id));
            setPlaylist(listData);

            setLoading(false);
        };
        catchErrors(getList)();
    }, [id]);

    if (loading) return <LoadingFullScreen />;

    if (!playlist) return <></>;

    return (
        <>
            <ProfileHeader profile={playlist} />

            <div className="container mx-auto flex max-w-screen-lg flex-col gap-y-10 px-6 pt-6 2xl:px-0">
                <SectionTemplate title="profile / tracks" distenation="">
                    <table className="w-full text-left text-gray-200">
                        <thead>
                            <tr>
                                <th className="border-b border-slate-700 pb-4 pl-4">
                                    #
                                </th>
                                <th className="border-b border-slate-700 pb-4">
                                    Image
                                </th>
                                <th className="border-b border-slate-700 pb-4">
                                    Name
                                </th>
                                <th className="hidden border-b border-slate-700 pb-4 md:table-cell">
                                    Artist(s)
                                </th>
                                <th className="border-b border-slate-700 pb-4 pr-4">
                                    Duration
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {playlist.tracks.items.map((item, index) => {
                                return (
                                    <tr
                                        key={item.track.id}
                                        className="transition-colors hover:bg-white/5 hover:text-white"
                                    >
                                        <td className="border-b border-slate-700/30 px-2 pt-2 pl-4">
                                            {index + 1}
                                        </td>
                                        <td className="border-b border-slate-700/30 px-2 pt-2">
                                            <Image
                                                src={
                                                    item.track.album.images[0]
                                                        .url
                                                }
                                                alt={item.track.name}
                                                width="50"
                                                height="50"
                                                className="rounded"
                                            />
                                        </td>
                                        <td className="border-b border-slate-700/30 px-2 pt-2">
                                            {item.track.name}
                                        </td>
                                        <td className="hidden border-b border-slate-700/30 px-2 pt-2 md:table-cell">
                                            <div className="flex gap-1">
                                                {item.track.artists.map(
                                                    (artist) => (
                                                        <span
                                                            key={artist.id}
                                                            className="rounded bg-white/10 px-3 py-1"
                                                        >
                                                            {artist.name}
                                                        </span>
                                                    )
                                                )}
                                            </div>
                                        </td>
                                        <td className="border-b border-slate-700/30 px-2 pt-2 pr-4">
                                            {convertSecondsToTime(
                                                item.track.duration_ms
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </SectionTemplate>
            </div>
        </>
    );
};

export default List;
