import { useRouter } from "next/router";
import { logout } from "../spotify/getAccessToken";

const Logout = () => {
    const { pathname } = useRouter();
    const dontShowPathNames = ["/"];

    if (dontShowPathNames.includes(pathname)) return <></>;
    return (
        <div className="absolute top-0 right-12 z-10 mx-auto max-w-screen-lg pt-6">
            <button
                onClick={() => logout()}
                className="rounded-full bg-black px-4 py-1 font-bold text-white"
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;
