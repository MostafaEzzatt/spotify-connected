import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";
import Logout from "../Logout";
import ProfileHeader from "../ProfileHeader";

interface props {
    children: React.ReactNode;
}

const Layout = ({ children }: props) => {
    const {
        data: profile,
        isLoading,
        isError,
    } = useQuery(["profile"], () => getRequests(paths.profile));

    const { pathname } = useRouter();
    const dontShowProfileInPath = ["/", "/playlists/[id]", "/artists/[id]"];
    const dontDisplayLayout = ["/", "/profile/[id]"];

    if (dontDisplayLayout.includes(pathname)) return <>{children}</>;

    if (isLoading) return <></>;
    if (isError) return <h1> Sorry something went wrong</h1>;
    return (
        <>
            <Head>
                <title>Spotify Connect</title>
            </Head>
            <Logout />

            {!dontShowProfileInPath.includes(pathname) && (
                <ProfileHeader profile={profile} />
            )}

            {children}
        </>
    );
};

export default Layout;
