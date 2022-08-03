// Components
import Playlists from "../components/Playlists";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";

// types
import { profileResponse } from "../types/spotifyAPIProfileResponse";

// Route Protection
import CreateUserProfile from "../components/CreateUserProfile";
import withAuth from "../components/protected/withAuth";

// TEST

const Dashboard = ({ profile }: { profile: profileResponse }) => {
    return (
        <>
            <div className="container mx-auto flex max-w-screen-lg flex-col gap-y-10 px-6 pt-6 pb-14 2xl:px-0">
                <TopArtists />

                <TopTracks />

                <Playlists />
            </div>
            <CreateUserProfile />
        </>
    );
};

export default withAuth(Dashboard);

// TODO:
// [x] Remove All Requests From Dashboard
// [x] Disable Create Profile Until Complete Finish Create App Context
// [x] Create App Context With React Context API
// [x] Add User Data To The Context
// [X] Create Component For Add/Update User Profile TO DB
