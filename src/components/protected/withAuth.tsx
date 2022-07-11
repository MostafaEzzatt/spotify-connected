import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";
import { Keys } from "../../spotify/spotifyLocalStorageKeys";
import { profileResponse } from "../../types/spotifyAPIProfileResponse";
import catchErrors from "../../utils/catchError";
import LoadingFullScreen from "../LoadingFullScreen";

export default function withAuth<T>(
    WrappedComponent: React.ComponentType<T | any>
) {
    function Auth(props: T) {
        const router = useRouter();
        const [profile, setProfile] = useState<profileResponse | null>(null);
        const [loading, setLoading] = useState(true);

        useEffect(() => {
            async function getProfile() {
                const requestProfile = await getRequests(paths.profile);
                setProfile(requestProfile);
                setLoading(false);
            }

            if (
                localStorage.getItem(Keys.accessToken) === null ||
                typeof localStorage.getItem(Keys.accessToken) === undefined
            ) {
                router.replace("/");
            } else {
                catchErrors(getProfile)();
            }
        }, [router]);

        if (loading) return <LoadingFullScreen />;
        return <WrappedComponent {...props} profile={profile} />;
    }

    Auth.displayName =
        WrappedComponent.displayName || WrappedComponent.name || "Component";

    return Auth;
}
