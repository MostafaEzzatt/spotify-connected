import React from "react";
import SectionHeading from "./typography/SectionHeading";

type Props = {
    title: string;
    distenation: string;
    seeMore?: boolean | null | undefined;
    children: React.ReactNode;
};

const SectionTemplate = (props: Props) => {
    const { title, children, distenation, seeMore } = props;
    return (
        <section>
            <SectionHeading
                txt={title}
                distenation={distenation}
                seeMore={seeMore}
            />

            {children}
        </section>
    );
};

export default SectionTemplate;
