import React from "react";
import { toast } from "react-toastify";
import { useAppContext } from "../context";
import isTwentyFourHoursPass from "../utils/isTwentyFourHoursPass";
import { trpc } from "../utils/trpc";
import TopPageMessage from "./TopPageMessage";

const CreateUserProfile = () => {
    const [profileUpdated, setProfileUpdated] = React.useState<boolean>(false);
    const [profileLink, setProfileLink] = React.useState<string>("");
    const { playLists, topArtists, topTracks, profile } = useAppContext();

    // create user and profile
    const { mutateAsync: createUserProfile } =
        trpc.useMutation("profile.create");
    const { mutateAsync: createUser } = trpc.useMutation("user.create");

    // get current user from db
    const { mutateAsync } = trpc.useMutation(["user.get"]);

    // update user and profile
    const { mutateAsync: updateUserProfile } =
        trpc.useMutation("profile.update");
    const { mutateAsync: updateUser } = trpc.useMutation("user.update");

    // revalidate user Profile
    const { mutateAsync: revalidateUserProfile } = trpc.useMutation(
        "user.revalidateProfile"
    );

    const handleProfileAlreadyUpdated = () => {
        toast.info("Profile updated less than 24 hours ago", {
            toastId: "profileUpdatedLessThan24Hours",
        });

        if (!profile) return;

        if (!profileUpdated) setProfileUpdated(true);
        setProfileLink(`${window.location.origin}/profile/${profile.id}`);
    };

    const createProfile = async () => {
        if (!playLists || !topArtists || !topTracks || !profile) {
            toast.info("Something went wrong, please try again later", {
                toastId: "somethingMessing",
            });
            return;
        }

        toast.info("Working on it...", { toastId: "workingOnIt" });

        if (profileUpdated) {
            handleProfileAlreadyUpdated();
            return;
        }

        const userDB = await mutateAsync({ id: profile.id });

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
                        `${window.location.origin}/profile/${addUser.spotifyId}`
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
                        `${window.location.origin}/profile/${userDB.spotifyId}`
                    );

                    await revalidateUserProfile({ id: userDB.spotifyId });
                } else {
                    handleProfileAlreadyUpdated();
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

    return (
        <>
            <TopPageMessage
                message={profileLink}
                resetMessage={setProfileLink}
            />
            <button
                onClick={() => createProfile()}
                className="sticky bottom-6 left-6 rounded-full bg-highlight-press px-4 py-2 text-white drop-shadow-md hover:bg-highlight disabled:bg-gray-300 disabled:text-base"
                disabled={profileUpdated}
            >
                {profileUpdated ? "Wait 24h to update" : "Create Profile"}
            </button>
        </>
    );
};

export default CreateUserProfile;
