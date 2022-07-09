// Types
import { profileResponse } from "../types/spotifyAPIProfileResponse";

// Components
import CustomeImage from "./CustomeImage";

type Props = {
    profile: profileResponse | null;
};

const ProfileHeader = (props: Props) => {
    const { profile } = props;

    if (!profile) return <></>;

    return (
        <div className="w-full py-8 bg-headerBackground bg-gradient-to-b from-transparent to-black/50">
            <div className="flex flex-col md:flex-row items-center gap-6 mx-auto max-w-max">
                <CustomeImage
                    image={profile.images[0].url}
                    alt={profile.display_name}
                    type={profile.type}
                />

                <div className="mt-2">
                    <h2 className="text-xs font-bold uppercase text-white">
                        Profile
                    </h2>

                    <h1 className="text-7xl sm:text-8xl font-black text-white">
                        {profile?.display_name}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default ProfileHeader;
