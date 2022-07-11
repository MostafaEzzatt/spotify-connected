import { Profile } from "@prisma/client";
import convertSecondsToTime from "./convertSecondsToTime";

const isTwentyFourHoursPass = (userDB: {
    profile: Profile[];
    id: string;
    updatedAt: Date;
    spotifyId: string;
    displayName: string;
    email: string;
    country: string;
    image: string;
}) => {
    const currentTime = new Date().getTime();
    const userUpdatedAt = new Date(userDB.updatedAt).getTime();
    const diff = convertSecondsToTime(currentTime - userUpdatedAt);
    const split = diff.split(":");
    if (split.length == 3 && parseInt(split[0] || "") >= 24) return true;
};

export default isTwentyFourHoursPass;
