import Link from "next/link";
import React from "react";

const PrimaryButtonLink = (props: { href: string; text: string }) => {
    const { href, text } = props;

    return (
        <Link href={href}>
            <a className="text-black text-xl font-bold bg-highlight hover:scale-110 px-7 py-2 rounded-full transition-colors">
                {text}
            </a>
        </Link>
    );
};

export default PrimaryButtonLink;
