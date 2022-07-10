import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CustomeImage from "../../../components/CustomeImage";
import LoadingFullScreen from "../../../components/LoadingFullScreen";
import ProfileHeader from "../../../components/ProfileHeader";
import getRequests from "../../../spotify/getRequest";
import paths from "../../../spotify/requestPaths";
import spotifySinglePlaylistResponse from "../../../types/spotifySinglePlaylistResponse";
import catchErrors from "../../../utils/catchError";

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

    return <ProfileHeader profile={playlist} />;
};

export default List;
