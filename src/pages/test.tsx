import React from "react";
import CustomeImage from "../components/CustomeImage";
import convertSecondsToTime from "../utils/convertSecondsToTime";

interface bodyItem {
    type: "TEXT" | "IMAGE" | "ARRAY" | "NUMBER";
    data: string | number | { name: string }[];
    alt?: string;
    hiddenSM: boolean;
}

type bodyArray = bodyItem[];

interface heading {
    text: string;
    hiddenSM: boolean;
}

interface props {
    heading: heading[];
    body: bodyArray[];
}

const Test = ({ heading, body }: props) => {
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
                {body.map((item, idx) => {
                    return (
                        <tr key={`${item}${idx}`}>
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
                                            {item.type === "TEXT" && item.data}
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
                {/* <td className="border-b border-slate-700/30 px-2 pt-2 pl-4"></td>
                <td className="hidden border-b border-slate-700/30 px-2 pt-2 md:table-cell">
                    <div className="flex gap-1">
                        <span className="rounded bg-white/10 px-3 py-1"></span>
                    </div>
                </td> */}
            </tbody>
        </table>
    );
};

export const getServerSideProps = async () => {
    const heading = [
        {
            text: "#",
            hiddenSM: false,
        },
        {
            text: "Image",
            hiddenSM: false,
        },
        {
            text: "Name",
            hiddenSM: false,
        },
        {
            text: "Artist(s)",
            hiddenSM: true,
        },
        {
            text: "Duration",
            hiddenSM: false,
        },
    ];

    const body = [
        [
            {
                type: "TEXT",
                data: "1",
                hiddenSM: false,
            },
            {
                type: "IMAGE",
                data: "https://i.scdn.co/image/ab67616d0000b2732d304119425785fecb857528",
                alt: "image avatar",
                hiddenSM: false,
            },
            {
                type: "TEXT",
                data: "Track 1",
                hiddenSM: false,
            },
            {
                type: "ARRAY",
                data: [
                    {
                        name: "Artist 1",
                    },
                ],
                hiddenSM: true,
            },
            {
                type: "NUMBER",
                data: 30000000,
                hiddenSM: false,
            },
        ],
    ];

    return {
        props: {
            heading,
            body: body,
        },
    };
};

export default Test;
