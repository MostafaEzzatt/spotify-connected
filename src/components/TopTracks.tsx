import Image from "next/image";
import topTracksResponse from "../types/spotifyTopTacks";
import convertSecondsToTime from "../utils/convertSecondsToTime";

type Props = {
    tracks: topTracksResponse | null;
    show: number;
};

const TopTracks = (props: Props) => {
    const { tracks, show } = props;

    if (!tracks) return <></>;
    if (tracks.items.length === 0) return <></>;

    return (
        <table className="w-full text-left text-gray-200">
            <thead>
                <tr>
                    <th className="pb-4 border-b border-slate-700 pl-4">#</th>
                    <th className="pb-4 border-b border-slate-700">Image</th>
                    <th className="pb-4 border-b border-slate-700">Name</th>
                    <th className="pb-4 border-b border-slate-700 hidden md:visible">
                        Artist(s)
                    </th>
                    <th className="pb-4 border-b border-slate-700 pr-4">
                        Duration
                    </th>
                </tr>
            </thead>
            <tbody>
                {tracks.items
                    .slice(0, show || tracks.items.length)
                    .map((item, index) => {
                        return (
                            <tr
                                key={item.id}
                                className="hover:bg-white/5 transition-colors hover:text-white"
                            >
                                <td className="pt-2 px-2 border-b border-slate-700/30 pl-4">
                                    {index + 1}
                                </td>
                                <td className="pt-2 px-2 border-b border-slate-700/30">
                                    <Image
                                        src={item.album.images[0].url}
                                        alt={item.name}
                                        width="50"
                                        height="50"
                                        className="rounded"
                                    />
                                </td>
                                <td className="pt-2 px-2 border-b border-slate-700/30">
                                    {item.name}
                                </td>
                                <td className="pt-2 px-2 border-b border-slate-700/30 hidden md:visible">
                                    <div className="flex gap-1">
                                        {item.artists.map((artist) => (
                                            <span
                                                key={artist.id}
                                                className="bg-white/10 px-3 py-1 rounded"
                                            >
                                                {artist.name}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="pt-2 px-2 border-b border-slate-700/30 pr-4">
                                    {convertSecondsToTime(item.duration_ms)}
                                </td>
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
};

export default TopTracks;
