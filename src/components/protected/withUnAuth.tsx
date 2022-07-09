import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Keys } from "../../spotify/spotifyLocalStorageKeys";

export default function withPublic<T>(
    WrappedComponent: React.ComponentType<T | any>
) {
    function UnAuth(props: T) {
        const router = useRouter();

        useEffect(() => {
            if (localStorage.getItem(Keys.accessToken)) {
                router.replace("/dashboard");
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    }

    UnAuth.displayName =
        WrappedComponent.displayName || WrappedComponent.name || "Component";

    return UnAuth;
}
