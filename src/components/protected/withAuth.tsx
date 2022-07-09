import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Keys } from "../../spotify/spotifyLocalStorageKeys";

export default function withAuth<T>(
    WrappedComponent: React.ComponentType<T | any>
) {
    function Auth(props: T) {
        const router = useRouter();

        useEffect(() => {
            if (
                localStorage.getItem(Keys.accessToken) === null ||
                typeof localStorage.getItem(Keys.accessToken) === undefined
            ) {
                router.replace("/");
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    }

    Auth.displayName =
        WrappedComponent.displayName || WrappedComponent.name || "Component";

    return Auth;
}
