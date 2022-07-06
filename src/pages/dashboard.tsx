import React, { useEffect } from "react";
import getProfileData from "../spotify/getProfileData";
import catchErrors from "../utils/catchError";

const Dashboard = () => {
    const [profile, setProfile] = React.useState(null);

    useEffect(() => {
        const getProfile = async () => {
            const data = await getProfileData();
            setProfile(data);
        };

        catchErrors(getProfile)();
    }, []);

    console.log(profile);
    return <div>Dashboard</div>;
};

export default Dashboard;

// TODO
// 1. Get profile data from Spotify
// 2. Display profile data
// 3. Get user's Playlists from Spotify
// 4. Get User's top tracks from Spotify
// 5. Get User's top artists from Spotify
