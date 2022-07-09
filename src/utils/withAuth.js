import { useRouter } from "next/router";
import { useEffect } from "react";

import { Keys } from "../spotify/spotifyLocalStorageKeys";

function withAuth(WrappedComponent) {
    return function Auth(props) {
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
    };
}

export default withAuth;
