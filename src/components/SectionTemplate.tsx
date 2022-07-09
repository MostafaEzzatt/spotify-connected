import React from "react";
import SectionHeading from "./typography/SectionHeading";

type Props = {
    title: string;
    children: React.ReactNode;
};

const SectionTemplate = (props: Props) => {
    const { title, children } = props;
    return (
        <section>
            <SectionHeading txt={title} />

            {children}
        </section>
    );
};

export default SectionTemplate;
