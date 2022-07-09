import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingFullScreen from "../components/LoadingFullScreen";
import PrimaryButtonLink from "../components/PrimaryButtonLink";

// spotify
import getSpotifyAccessToken from "../spotify/getAccessToken";

// protect route util
import withPublic from "../components/protected/withUnAuth";

const Home: NextPage = () => {
    const [accessToken, setAccessToken] = useState<
        string | null | undefined | false
    >(null);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();

    useEffect(() => {
        const getAccessToken = getSpotifyAccessToken(router.query);
        setAccessToken(getAccessToken);

        setLoading(false);
    }, [router.query]);

    if (loading) return <LoadingFullScreen />;

    if (typeof accessToken !== "boolean" && !accessToken)
        <div className="w-full h-screen flex justify-center items-center bg-base text-teal-300">
            Something went wrong
        </div>;
    return (
        <>
            <div className="w-full min-h-screen flex justify-center items-center">
                {!accessToken && (
                    <PrimaryButtonLink
                        href="/api/login"
                        text="Login With Spotify"
                    />
                )}
            </div>
        </>
    );
};

export default withPublic(Home);
