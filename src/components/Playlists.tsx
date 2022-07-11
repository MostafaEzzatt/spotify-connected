import Link from "next/link";
import playListResponse from "../types/playListResponse";
import CustomeImage from "./CustomeImage";

type Props = {
    playLists: playListResponse | null;
    show?: number;
};

const Playlists = (props: Props) => {
    const { playLists, show } = props;

    if (!playLists) return <></>;

    return (
        <>
            {playLists && (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {playLists.items
                        .slice(0, show || playLists.items.length)
                        .map((item) => {
                            return (
                                // <Link
                                // href={`/playlists/${item.id}`}
                                // key={item.id}
                                // >
                                // <a className="mx-auto w-list-item sm:w-full">
                                <div
                                    className="mx-auto w-list-item sm:w-full"
                                    key={item.id}
                                >
                                    <div className="flex h-full flex-col items-center justify-end bg-listBlock p-4 drop-shadow transition-shadow hover:drop-shadow-md">
                                        <div className="mb-2 w-full">
                                            <CustomeImage
                                                image={item?.images[0]?.url}
                                                alt={item.name}
                                                type={item.type}
                                            />
                                        </div>
                                        <div className="w-full max-w-full">
                                            <div className="max-w-full truncate font-bold uppercase text-white">
                                                {item.name || "No Name"}
                                            </div>
                                            <div className="text-sm text-gray-400">
                                                {item.tracks.total} tracks
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                // </a>
                                // </Link>
                            );
                        })}
                </div>
            )}
        </>
    );
};

export default Playlists;
