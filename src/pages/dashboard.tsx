import React, { useEffect } from "react";
import catchErrors from "../utils/catchError";

// types
import getRequests from "../spotify/getRequest";
import paths from "../spotify/requestPaths";
import type PlayListResponse from "../types/playListResponse";
import artistsResponse from "../types/spotifyArtistsResponse";

const Dashboard = () => {
    const [profile, setProfile] = React.useState(null);
    const [playLists, setPlayLists] = React.useState<PlayListResponse | null>(
        null
    );
    const [topArtists, setTopArtists] = React.useState<artistsResponse | null>(
        null
    );

    useEffect(() => {
        const getProfile = async () => {
            const profileData = await getRequests(paths.profile);
            setProfile(profileData);

            const playlistData = await getRequests(paths.playlists);
            setPlayLists(playlistData);

            const topArtistsData = await getRequests(paths.topArtistsMedium);
            setTopArtists(topArtistsData);
        };
        catchErrors(getProfile)();
    }, []);

    return (
        <>
            <div>Dashboard</div>

            <div className="flex gap-6 text-white">
                {playLists &&
                    playLists.items.map((item) => {
                        return (
                            <div key={item.id}>
                                {item.name}{" "}
                                {item.images.length >= 1 && (
                                    <img
                                        src={item.images[0].url}
                                        alt={item.name}
                                    />
                                )}
                            </div>
                        );
                    })}
            </div>
        </>
    );
};

export default Dashboard;

// TODO
// 1. Get profile data from Spotify
// 2. Display profile data
// 3. Get user's Playlists from Spotify
// 4. Get User's top tracks from Spotify
// 5. Get User's top artists from Spotify
