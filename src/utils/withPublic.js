import { useRouter } from "next/router";
import { useEffect } from "react";

import { Keys } from "../spotify/spotifyLocalStorageKeys";

function withPublic(WrappedComponent) {
    return function UnAuth(props) {
        const router = useRouter();

        useEffect(() => {
            if (localStorage.getItem(Keys.accessToken)) {
                router.replace("/dashboard");
            }
        }, [router]);

        return <WrappedComponent {...props} />;
    };
}

export default withPublic;
