import React from "react";

type Props = { txt: string };

const SectionHeading = (props: Props) => {
    return <h2 className="font-bold text-white text-2xl mb-4">{props.txt}</h2>;
};

export default SectionHeading;
