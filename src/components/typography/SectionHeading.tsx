import Link from "next/link";
import React from "react";

type Props = { txt: string; distenation: string };

const SectionHeading = (props: Props) => {
    return (
        <div className="w-full flex items-center justify-between text-sm font-bold">
            <h2 className="text-white text-2xl mb-4">{props.txt}</h2>

            <Link href={props.distenation}>
                <a className="text-link hover:underline">See More</a>
            </Link>
        </div>
    );
};

export default SectionHeading;
