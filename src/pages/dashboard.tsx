// Components
import Playlists from "../components/Playlists";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";

// types
import { profileResponse } from "../types/spotifyAPIProfileResponse";

// Route Protection
import { Suspense } from "react";
import CreateUserProfile from "../components/CreateUserProfile";
import LoadingFullScreen from "../components/LoadingFullScreen";
import withAuth from "../components/protected/withAuth";

const Dashboard = () => {
    return (
        <>
            <Suspense fallback={<LoadingFullScreen />}>
                <div className="container mx-auto flex max-w-screen-lg flex-col gap-y-10 px-6 pt-6 pb-14 2xl:px-0">
                    <TopArtists />

                    <TopTracks />

                    <Playlists />
                </div>
                <CreateUserProfile />
            </Suspense>
        </>
    );
};

export default withAuth(Dashboard);
