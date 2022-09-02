import Link from "next/link";
import React from "react";

const PrimaryButtonLink = (props: { href: string; text: string }) => {
    const { href, text } = props;

    return (
        <Link href={href}>
            <a className="cursor-pointer rounded-full bg-highlight px-7 py-2 text-xl font-bold text-black transition-colors hover:scale-110">
                {text}
            </a>
        </Link>
    );
};

export default PrimaryButtonLink;
