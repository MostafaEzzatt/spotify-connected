import Link from "next/link";
import React from "react";
import artistsResponse from "../types/spotifyArtistsResponse";
import CustomeImage from "./CustomeImage";

type Props = {
    artists: artistsResponse | null;
    show: number;
};

const TopArtists = (props: Props) => {
    const { artists, show } = props;

    if (!artists) return <></>;

    if (artists.items.length === 0) return <></>;

    return (
        <div>
            <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {artists.items
                        .slice(0, show || artists.items.length)
                        .map((item) => {
                            return (
                                <Link
                                    href={`/top_artists/${item.id}`}
                                    key={item.id}
                                >
                                    <a className="mx-auto w-list-item sm:w-full">
                                        <div className="bg-listBlock p-4 flex flex-col items-center justify-end h-full w-list-item sm:w-full">
                                            <div className="mb-2 w-full">
                                                <CustomeImage
                                                    image={item?.images[0]?.url}
                                                    alt={item.name}
                                                    type={"user"}
                                                />
                                            </div>
                                            <div className="max-w-full w-full">
                                                <div className="font-bold uppercase truncate text-white">
                                                    {item.name || "No Name"}
                                                </div>
                                                <div className="text-sm text-gray-400">
                                                    Artist
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            );
                        })}
                </div>
            </>
        </div>
    );
};

export default TopArtists;
