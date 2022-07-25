import Link from "next/link";
import React from "react";
import { item as playItemType } from "../../types/playListResponse";
import { item as artistItemType } from "../../types/spotifyArtistsResponse";
import CustomeImage from "../CustomeImage";

const CardItem = ({ item }: { item: playItemType | artistItemType }) => {
    return (
        <Link href={item.external_urls.spotify}>
            <a className="mx-auto w-list-item sm:w-full">
                <div className="flex h-full w-list-item flex-col items-center justify-end bg-listBlock p-4 drop-shadow transition-shadow hover:drop-shadow-md sm:w-full">
                    <div className="mb-2 w-full">
                        <CustomeImage
                            image={item?.images[0]?.url}
                            alt={item.name}
                            type={item.type}
                            width={375}
                            height={375}
                        />
                    </div>
                    <div className="w-full max-w-full">
                        <div className="truncate font-bold uppercase text-white">
                            {item.name || "No Name"}
                        </div>
                        <div className="text-sm text-gray-400">
                            {item.type === "artist"
                                ? "Artist"
                                : `${item.tracks.total} Tracks`}
                        </div>
                    </div>
                </div>
            </a>
        </Link>
    );
};

export default CardItem;
