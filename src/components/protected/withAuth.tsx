import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";
import { Keys } from "../../spotify/spotifyLocalStorageKeys";
import LoadingFullScreen from "../LoadingFullScreen";

export default function withAuth<T>(
    WrappedComponent: React.ComponentType<T | any>
) {
    function Auth(props: T) {
        const router = useRouter();
        const {
            data: profile,
            isLoading,
            isError,
        } = useQuery(["profile"], () => getRequests(paths.profile));

        useEffect(() => {
            if (
                localStorage.getItem(Keys.accessToken) === null ||
                typeof localStorage.getItem(Keys.accessToken) === undefined
            ) {
                router.replace("/");
            }
        }, [router]);

        if (isLoading) return <LoadingFullScreen />;
        if (isError) return <h1> Sorry something went wrong</h1>;
        return <WrappedComponent {...props} profile={profile} />;
    }

    Auth.displayName =
        WrappedComponent.displayName || WrappedComponent.name || "Component";

    return Auth;
}
