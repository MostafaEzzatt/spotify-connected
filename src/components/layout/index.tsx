import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";
import { Keys } from "../../spotify/spotifyLocalStorageKeys";
import { profileResponse } from "../../types/spotifyAPIProfileResponse";
import catchErrors from "../../utils/catchError";
import Logout from "../Logout";
import ProfileHeader from "../ProfileHeader";

interface props {
    children: React.ReactNode;
}

const Layout = ({ children }: props) => {
    const [profile, setProfile] = useState<profileResponse | null>(null);
    const { pathname } = useRouter();
    const dontShowProfileInPath = ["/playlists/[id]"];
    const dontDisplayLayout = ["/profile/[id]"];

    useEffect(() => {
        const getProfile = async () => {
            const tokenType = localStorage.getItem(Keys.accessToken);

            if (tokenType === null || tokenType === undefined || !tokenType)
                return;

            const profileData = await getRequests(paths.profile);
            setProfile(profileData);
        };
        catchErrors(getProfile)();
    }, [children]);

    if (dontDisplayLayout.includes(pathname)) return <>{children}</>;

    return (
        <>
            <Logout />

            {!dontShowProfileInPath.includes(pathname) && (
                <ProfileHeader profile={profile} />
            )}

            {children}
        </>
    );
};

export default Layout;
