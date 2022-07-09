import Link from "next/link";
import playListResponse from "../types/playListResponse";
import CustomeImage from "./CustomeImage";

type Props = {
    playLists: playListResponse | null;
    show?: number;
};

const Playlists = (props: Props) => {
    const { playLists, show } = props;
    return (
        <>
            {playLists && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {playLists.items
                        .slice(0, show || playLists.items.length)
                        .map((item) => {
                            return (
                                <Link
                                    href={`/playlist/${item.id}`}
                                    key={item.id}
                                >
                                    <a className="mx-auto w-list-item sm:w-full">
                                        <div className="bg-listBlock p-4 flex flex-col items-center justify-end h-full">
                                            <div className="mb-2 w-full">
                                                <CustomeImage
                                                    image={item?.images[0]?.url}
                                                    alt={item.name}
                                                    type={item.type}
                                                />
                                            </div>
                                            <div className="max-w-full w-full">
                                                <div className="font-bold uppercase truncate text-white max-w-full">
                                                    {item.name || "No Name"}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    {item.tracks.total} tracks
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            );
                        })}
                </div>
            )}
        </>
    );
};

export default Playlists;
