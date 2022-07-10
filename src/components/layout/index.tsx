import { useRouter } from "next/router";
import React, { useEffect } from "react";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";
import { profileResponse } from "../../types/spotifyAPIProfileResponse";
import catchErrors from "../../utils/catchError";
import Logout from "../Logout";
import ProfileHeader from "../ProfileHeader";

interface props {
    children: React.ReactNode;
}

const Layout = ({ children }: props) => {
    const [profile, setProfile] = React.useState<profileResponse | null>(null);
    const { pathname } = useRouter();
    const dontShowProfileInPath = ["/playlists/[id]"];

    useEffect(() => {
        const getProfile = async () => {
            const tokenType = localStorage.getItem("spotify_access_token");
            if (tokenType === undefined || tokenType === null || !tokenType)
                return;
            const profileData = await getRequests(paths.profile);
            setProfile(profileData);
        };
        catchErrors(getProfile)();
    }, []);

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
