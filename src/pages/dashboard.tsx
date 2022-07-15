import React, { useEffect } from "react";
import { toast } from "react-toastify";

// utils
import catchErrors from "../utils/catchError";
import isTwentyFourHoursPass from "../utils/isTwentyFourHoursPass";
import { trpc } from "../utils/trpc";

// spotify
import getRequests from "../spotify/getRequest";
import paths from "../spotify/requestPaths";

// Components
import LoadingFullScreen from "../components/LoadingFullScreen";
import Playlists from "../components/Playlists";
import SectionTemplate from "../components/SectionTemplate";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";

// types
import type PlayListResponse from "../types/playListResponse";
import { profileResponse } from "../types/spotifyAPIProfileResponse";
import artistsResponse from "../types/spotifyArtistsResponse";
import topTracksResponse from "../types/spotifyTopTacks";

// Route Protection
import withAuth from "../components/protected/withAuth";
import TopPageMessage from "../components/TopPageMessage";

// TEST

const Dashboard = ({ profile }: { profile: profileResponse }) => {
    const [profileLink, setProfileLink] = React.useState<string>("");

    const [playLists, setPlayLists] = React.useState<PlayListResponse | null>(
        null
    );
    const [topArtists, setTopArtists] = React.useState<artistsResponse | null>(
        null
    );
    const [topTracks, setTopTracks] = React.useState<topTracksResponse | null>(
        null
    );

    const [loading, setLoading] = React.useState(true);
    const [profileUpdated, setProfileUpdated] = React.useState<boolean>(false);

    // create user and profile
    const { mutateAsync: createUserProfile } =
        trpc.useMutation("profile.create");
    const { mutateAsync: createUser } = trpc.useMutation("user.create");

    // get current user from db
    const { data: userDB } = trpc.useQuery(["user.get", { id: profile.id }]);

    // update user and profile
    const { mutateAsync: updateUserProfile } =
        trpc.useMutation("profile.update");
    const { mutateAsync: updateUser } = trpc.useMutation("user.update");

    useEffect(() => {
        const getData = async () => {
            const playlistData = await getRequests(paths.playlists);
            setPlayLists(playlistData);

            const topArtistsData = await getRequests(paths.topArtistsShort);
            setTopArtists(topArtistsData);

            const topTracksData = await getRequests(paths.topTracksShort);
            setTopTracks(topTracksData);

            setLoading(false);
        };
        catchErrors(getData)();
    }, []);

    const createProfile = async () => {
        if (!playLists || !topArtists || !topTracks || !profile) {
            toast.info("Something went wrong, please try again later", {
                toastId: "somethingMessing",
            });
            return;
        }

        toast.info("Working on it...", { toastId: "workingOnIt" });

        if (profileUpdated) {
            toast.info("Profile updated less than 24 hours ago", {
                toastId: "profileUpdatedLessThan24Hours",
            });
            setProfileLink(`${window.location.origin}/profile/${profile.id}`);
            return;
        }

        try {
            const profileData = {
                playlists: JSON.stringify(playLists),
                topArtists: JSON.stringify(topArtists),
                topTracks: JSON.stringify(topTracks),
            };

            const userData = {
                spotifyId: profile.id,
                displayName: profile.display_name,
                email: profile.email,
                image: profile?.images[0]?.url || "",
                country: profile.country,
            };

            if (!userDB?.id) {
                const addUser = await createUser(userData);

                if (addUser) {
                    await createUserProfile({
                        ...profileData,
                        userId: addUser.id,
                    });

                    toast.success("Profile created", {
                        toastId: "profileCreated",
                    });
                    setProfileUpdated(true);
                    setProfileLink(
                        `${window.location.origin}/profile/${addUser.id}`
                    );
                }
            } else {
                if (isTwentyFourHoursPass(userDB)) {
                    await updateUser({ ...userData, id: userDB.id });
                    await updateUserProfile({
                        ...profileData,
                        userId: userDB.id,
                    });
                    toast.success("Profile updated", {
                        toastId: "profileUpdated",
                    });
                    setProfileUpdated(true);
                    setProfileLink(
                        `${window.location.origin}/profile/${userDB.id}`
                    );
                } else {
                    toast.info("Profile updated less than 24 hours ago", {
                        toastId: "profileUpdatedLessThan24Hours",
                    });
                }
            }
        } catch (error: any) {
            toast.error(`Something went wrong`, {
                toastId: "profileError",
            });
            if (error.data.httpStatus === 500) {
                console.log("500 error");
            }
        }
    };

    if (loading) return <LoadingFullScreen />;

    return (
        <>
            <TopPageMessage
                message={profileLink}
                resetMessage={setProfileLink}
            />
            <div className="container mx-auto flex max-w-screen-lg flex-col gap-y-10 px-6 pt-6 pb-14 2xl:px-0">
                <SectionTemplate title="Top Artists" distenation="/top_artists">
                    <TopArtists artists={topArtists} show={8} />
                </SectionTemplate>

                <SectionTemplate title="Top Tracks" distenation="/top_tracks">
                    <TopTracks tracks={topTracks} show={8} />
                </SectionTemplate>

                <SectionTemplate title="Playlists" distenation="/playlists">
                    <Playlists playLists={playLists} show={8} />
                </SectionTemplate>
            </div>
            <button
                onClick={() => createProfile()}
                className="sticky bottom-6 left-6 rounded-full bg-highlight-press px-4 py-2 text-white drop-shadow-md hover:bg-highlight"
            >
                Create Profile
            </button>
        </>
    );
};

export default withAuth(Dashboard);
