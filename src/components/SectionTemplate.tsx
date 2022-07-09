import React from "react";
import SectionHeading from "./typography/SectionHeading";

type Props = {
    title: string;
    distenation: string;
    children: React.ReactNode;
};

const SectionTemplate = (props: Props) => {
    const { title, children, distenation } = props;
    return (
        <section>
            <SectionHeading txt={title} distenation={distenation} />

            {children}
        </section>
    );
};

export default SectionTemplate;
