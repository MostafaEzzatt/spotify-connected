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

    // const [profileUpdated, setProfileUpdated] = React.useState<boolean>(false);

    // // create user and profile
    // const { mutateAsync: createUserProfile } =
    //     trpc.useMutation("profile.create");
    // const { mutateAsync: createUser } = trpc.useMutation("user.create");

    // // get current user from db
    // const { data: userDB } = trpc.useQuery(["user.get", { id: profile.id }]);

    // // update user and profile
    // const { mutateAsync: updateUserProfile } =
    //     trpc.useMutation("profile.update");
    // const { mutateAsync: updateUser } = trpc.useMutation("user.update");

    // const handleProfileAlreadyUpdated = () => {
    //     toast.info("Profile updated less than 24 hours ago", {
    //         toastId: "profileUpdatedLessThan24Hours",
    //     });

    //     if (!profileUpdated) setProfileUpdated(true);
    //     setProfileLink(`${window.location.origin}/profile/${profile.id}`);
    // };

    // const createProfile = async () => {
    //     if (!playLists || !topArtists || !topTracks || !profile) {
    //         toast.info("Something went wrong, please try again later", {
    //             toastId: "somethingMessing",
    //         });
    //         return;
    //     }

    //     toast.info("Working on it...", { toastId: "workingOnIt" });

    //     if (profileUpdated) {
    //         handleProfileAlreadyUpdated();
    //         return;
    //     }

    //     try {
    //         const profileData = {
    //             playlists: JSON.stringify(playLists),
    //             topArtists: JSON.stringify(topArtists),
    //             topTracks: JSON.stringify(topTracks),
    //         };

    //         const userData = {
    //             spotifyId: profile.id,
    //             displayName: profile.display_name,
    //             email: profile.email,
    //             image: profile?.images[0]?.url || "",
    //             country: profile.country,
    //         };

    //         if (!userDB?.id) {
    //             const addUser = await createUser(userData);

    //             if (addUser) {
    //                 await createUserProfile({
    //                     ...profileData,
    //                     userId: addUser.id,
    //                 });

    //                 toast.success("Profile created", {
    //                     toastId: "profileCreated",
    //                 });
    //                 setProfileUpdated(true);
    //                 setProfileLink(
    //                     `${window.location.origin}/profile/${addUser.spotifyId}`
    //                 );
    //             }
    //         } else {
    //             if (isTwentyFourHoursPass(userDB)) {
    //                 await updateUser({ ...userData, id: userDB.id });
    //                 await updateUserProfile({
    //                     ...profileData,
    //                     userId: userDB.id,
    //                 });
    //                 toast.success("Profile updated", {
    //                     toastId: "profileUpdated",
    //                 });
    //                 setProfileUpdated(true);
    //                 setProfileLink(
    //                     `${window.location.origin}/profile/${userDB.spotifyId}`
    //                 );
    //             } else {
    //                 handleProfileAlreadyUpdated();
    //             }
    //         }
    //     } catch (error: any) {
    //         toast.error(`Something went wrong`, {
    //             toastId: "profileError",
    //         });
    //         if (error.data.httpStatus === 500) {
    //             console.log("500 error");
    //         }
    //     }
    // };

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
            {/* <button
                onClick={() => createProfile()}
                className="sticky bottom-6 left-6 rounded-full bg-highlight-press px-4 py-2 text-white drop-shadow-md hover:bg-highlight"
            >
                Create Profile
            </button> */}
        </>
    );
};

export default withAuth(Dashboard);

// TODO:
// [x] Remove All Requests From Dashboard
// [x] Disable Create Profile Until Complete Finish Create App Context
// [x] Create App Context With React Context API
// [ ] Create Indepenedt Component For Create User Profile
