import Link from "next/link";
import Home from "./svgs/Home";

const DashboardLinkBTN = () => {
    return (
        <Link href="/dashboard">
            <a className="inline-block rounded bg-headerBackground/25 p-2 text-base transition-colors hover:bg-highlight">
                <Home />
            </a>
        </Link>
    );
};

export default DashboardLinkBTN;
