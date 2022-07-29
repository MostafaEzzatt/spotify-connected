import React from "react";
import { toast } from "react-toastify";

// utils
import isTwentyFourHoursPass from "../utils/isTwentyFourHoursPass";
import { trpc } from "../utils/trpc";

// spotify
import getRequests from "../spotify/getRequest";
import paths from "../spotify/requestPaths";

// Components
import LoadingFullScreen from "../components/LoadingFullScreen";
import Playlists from "../components/Playlists";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";

// types
import { profileResponse } from "../types/spotifyAPIProfileResponse";

// Route Protection
import { useQuery } from "react-query";
import withAuth from "../components/protected/withAuth";
import TopPageMessage from "../components/TopPageMessage";

// TEST

const Dashboard = ({ profile }: { profile: profileResponse }) => {
    const [profileLink, setProfileLink] = React.useState<string>("");

    return (
        <>
            <TopPageMessage
                message={profileLink}
                resetMessage={setProfileLink}
            />
            <div className="container mx-auto flex max-w-screen-lg flex-col gap-y-10 px-6 pt-6 pb-14 2xl:px-0">
                <TopArtists />

                <TopTracks />

                <Playlists />
            </div>
        </>
    );
};

export default withAuth(Dashboard);

// TODO:
// [x] Remove All Requests From Dashboard
// [x] Disable Create Profile Until Complete Finish Create App Context
// [x] Create App Context With React Context API
// [x] Add User Data To The Context
// [ ] Create Indepenedt Component For Create User Profile
