import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import getRequests from "../../../spotify/getRequest";
import paths from "../../../spotify/requestPaths";
import topTracksResponse from "../../../types/spotifyTopTacks";
import catchErrors from "../../../utils/catchError";
import Image from "next/image";

const List = () => {
    const { id } = useRouter().query;
    const [playlist, setPlaylist] = useState<topTracksResponse | null>(null);

    useEffect(() => {
        const getList = async () => {
            if (!id || typeof id !== "string") return;

            const listData = await getRequests(paths.playlist(id));
            setPlaylist(listData);
            console.log(listData);
        };
        catchErrors(getList)();
    }, [id]);

    return (
        <div>
            <Image
                src={playlist?.images[0].url}
                width={200}
                height={200}
                alt={playlist.name}
            />
        </div>
    );
};

export default List;
