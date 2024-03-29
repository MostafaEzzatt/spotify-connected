import Link from "next/link";
import CustomeImage from "../components/CustomeImage";
import { bodyArray, heading } from "../types/table";
import convertSecondsToTime from "../utils/convertSecondsToTime";

interface props {
    heading: heading[];
    body: bodyArray[];
}

const Table = ({ heading, body }: props) => {
    if (body.length == 0)
        return (
            <div className="w-full rounded bg-listBlock py-4 px-2 text-center font-medium text-gray-200 shadow-md">
                This Playlist Don&apos;t Have Any Tracks Right Now!
            </div>
        );

    return (
        <table className="w-full text-left text-gray-200">
            <thead>
                <tr>
                    {heading.map((item, idx) => (
                        <th
                            key={`${item}${idx}`}
                            className={`border-b border-slate-700 pb-4 pl-4 ${
                                item.hiddenSM ? "hidden md:table-cell" : ""
                            }`}
                        >
                            {item.text}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {body.map((item, rowIdx) => {
                    return (
                        <tr
                            key={`${item}${rowIdx}`}
                            className="bg-base transition-colors hover:bg-white/5"
                        >
                            {item.map((item, idx) => {
                                return (
                                    <td
                                        key={`${item}${idx}`}
                                        className={`border-b border-slate-700/30 px-2 pt-2 ${
                                            item.hiddenSM
                                                ? "hidden md:table-cell"
                                                : ""
                                        }`}
                                    >
                                        <>
                                            {idx === 0
                                                ? rowIdx + 1
                                                : item.type === "TEXT" &&
                                                  item.data}

                                            {item.type === "LINK" && (
                                                <Link href={item.data}>
                                                    <a
                                                        target="_blank"
                                                        className="text-gray-200 transition-colors hover:text-highlight"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-5 w-5"
                                                            viewBox="0 0 20 20"
                                                            fill="currentColor"
                                                        >
                                                            <path
                                                                fillRule="evenodd"
                                                                d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                                                                clipRule="evenodd"
                                                            />
                                                        </svg>
                                                    </a>
                                                </Link>
                                            )}

                                            {item.type === "IMAGE" && (
                                                <CustomeImage
                                                    image={
                                                        typeof item.data ===
                                                        "string"
                                                            ? item.data
                                                            : undefined
                                                    }
                                                    width={50}
                                                    height={50}
                                                    alt={item.alt || ""}
                                                    type="track"
                                                />
                                            )}

                                            {item.type === "ARRAY" && (
                                                <div className="flex gap-1">
                                                    {Array.isArray(item.data) &&
                                                        item.data.map(
                                                            (item) => (
                                                                <span
                                                                    key={
                                                                        item.name
                                                                    }
                                                                    className="rounded bg-white/10 px-3 py-1"
                                                                >
                                                                    {item.name}
                                                                </span>
                                                            )
                                                        )}
                                                </div>
                                            )}

                                            {item.type === "NUMBER" &&
                                            typeof item.data === "number"
                                                ? convertSecondsToTime(
                                                      item.data
                                                  )
                                                : ""}
                                        </>
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default Table;
