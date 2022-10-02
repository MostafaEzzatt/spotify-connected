import Link from "next/link";
import { useRouter } from "next/router";
import DashboardLinkBTN from "../DashboardLinkBTN";

type Props = {
    txt: string;
    distenation: string;
    seeMore: boolean | null | undefined;
};

const SectionHeading = (props: Props) => {
    const { pathname } = useRouter();
    const dontShowInPath = ["/", "/dashboard"];
    return (
        <div className="flex w-full items-center justify-between text-sm font-bold">
            <h2 className="mb-4 flex items-center gap-2 text-2xl text-white">
                {!dontShowInPath.includes(pathname) && (
                    <>
                        <DashboardLinkBTN />
                        <span className="font-black text-headerBackground/25">
                            /
                        </span>
                    </>
                )}
                {props.txt}
            </h2>
            {props.seeMore && (
                <Link href={props.distenation}>
                    <a className="text-link hover:underline">See More</a>
                </Link>
            )}
        </div>
    );
};

export default SectionHeading;
