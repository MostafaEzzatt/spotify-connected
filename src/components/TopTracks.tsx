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
                    <th className="border-b border-slate-700 pb-4 pl-4">#</th>
                    <th className="border-b border-slate-700 pb-4">Image</th>
                    <th className="border-b border-slate-700 pb-4">Name</th>
                    <th className="hidden border-b border-slate-700 pb-4 md:table-cell">
                        Artist(s)
                    </th>
                    <th className="border-b border-slate-700 pb-4 pr-4">
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
                                className="transition-colors hover:bg-white/5 hover:text-white"
                            >
                                <td className="border-b border-slate-700/30 px-2 pt-2 pl-4">
                                    {index + 1}
                                </td>
                                <td className="border-b border-slate-700/30 px-2 pt-2">
                                    <Image
                                        src={item.album.images[0].url}
                                        alt={item.name}
                                        width="50"
                                        height="50"
                                        className="rounded"
                                    />
                                </td>
                                <td className="border-b border-slate-700/30 px-2 pt-2">
                                    {item.name}
                                </td>
                                <td className="hidden border-b border-slate-700/30 px-2 pt-2 md:table-cell">
                                    <div className="flex gap-1">
                                        {item.artists.map((artist) => (
                                            <span
                                                key={artist.id}
                                                className="rounded bg-white/10 px-3 py-1"
                                            >
                                                {artist.name}
                                            </span>
                                        ))}
                                    </div>
                                </td>
                                <td className="border-b border-slate-700/30 px-2 pt-2 pr-4">
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
