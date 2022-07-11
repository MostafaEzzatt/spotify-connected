// Types
import { profileResponse } from "../types/spotifyAPIProfileResponse";
import spotifySinglePlaylistResponse from "../types/spotifySinglePlaylistResponse";

// Components
import CustomeImage from "./CustomeImage";

type Props = {
    profile: profileResponse | spotifySinglePlaylistResponse | null;
};

const ProfileHeader = (props: Props) => {
    const { profile } = props;

    if (!profile) return <></>;

    return (
        <div className="w-full bg-headerBackground bg-gradient-to-b from-transparent to-black/50 py-8">
            <div className="mx-auto flex max-w-max flex-col items-center gap-6 md:flex-row">
                <div className="px-6 sm:px-0">
                    <CustomeImage
                        image={profile?.images[0]?.url}
                        alt={
                            profile.type == "user"
                                ? profile.display_name
                                : profile.name
                        }
                        type={profile.type}
                    />
                </div>

                <div className="mt-2 max-w-full px-6 xl:px-0">
                    <h2 className="text-xs font-bold uppercase text-white">
                        {profile.type == "user" ? "Profile" : "Playlist"}
                    </h2>

                    <h1 className="break-words text-7xl font-black text-white sm:text-8xl">
                        {profile.type == "user"
                            ? profile.display_name
                            : profile.name}
                    </h1>

                    {profile.type === "playlist" && (
                        <p
                            className="playlist-description mt-8 text-sm text-gray-200"
                            dangerouslySetInnerHTML={{
                                __html: profile.description,
                            }}
                        ></p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
