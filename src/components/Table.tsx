import React from "react";
import { boolean } from "zod";
import CustomeImage from "../components/CustomeImage";
import convertSecondsToTime from "../utils/convertSecondsToTime";

export enum BodyType {
    IMAGE = "IMAGE",
    TEXT = "TEXT",
    ARRAY = "ARRAY",
    NUMBER = "NUMBER",
}

type bodyItem =
    | {
          type: BodyType.IMAGE;
          data: string;
          hiddenSM: boolean;
          alt: string | undefined;
      }
    | {
          type: BodyType.TEXT;
          data: string;
          hiddenSM: boolean;
          alt?: string | undefined;
      }
    | {
          type: BodyType.ARRAY;
          data: { name: string }[];
          hiddenSM: boolean;
          alt?: string | undefined;
      }
    | {
          type: BodyType.NUMBER;
          data: number;
          hiddenSM: boolean;
          alt?: string | undefined;
      };

export type bodyArray = bodyItem[];

interface heading {
    text: string;
    hiddenSM: boolean;
}

interface props {
    heading: heading[];
    body: bodyArray[];
}

const Table = ({ heading, body }: props) => {
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
                        <tr
                            key={`${item}${idx}`}
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
            </tbody>
        </table>
    );
};

export default Table;
