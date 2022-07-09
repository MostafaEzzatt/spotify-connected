import React, { useEffect } from "react";
import catchErrors from "../utils/catchError";

// spotify
import getRequests from "../spotify/getRequest";
import paths from "../spotify/requestPaths";

// Components

// types
import type PlayListResponse from "../types/playListResponse";
import { profileResponse } from "../types/spotifyAPIProfileResponse";
import artistsResponse from "../types/spotifyArtistsResponse";
import topTracksResponse from "../types/spotifyTopTacks";

// Route Protection
import Logout from "../components/Logout";
import Playlists from "../components/Playlists";
import ProfileHeader from "../components/ProfileHeader";
import SectionTemplate from "../components/SectionTemplate";
import withAuth from "../utils/withAuth";
import TopArtists from "../components/TopArtists";
import TopTracks from "../components/TopTracks";

const Dashboard = () => {
    const [profile, setProfile] = React.useState<profileResponse | null>(null);
    const [playLists, setPlayLists] = React.useState<PlayListResponse | null>(
        null
    );
    const [topArtists, setTopArtists] = React.useState<artistsResponse | null>(
        null
    );
    const [topTracks, setTopTracks] = React.useState<topTracksResponse | null>(
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

            const topTracksData = await getRequests(paths.topTracksShort);
            setTopTracks(topTracksData);
        };
        catchErrors(getProfile)();
    }, []);

    return (
        <>
            <Logout />
            <ProfileHeader profile={profile} />

            <div className="container mx-auto flex flex-col gap-y-10 pt-6 px-6 2xl:px-0 max-w-screen-lg">
                <SectionTemplate title="Top Artists" distenation="/top_artists">
                    <TopArtists artists={topArtists} show={8} />
                </SectionTemplate>

                <SectionTemplate title="Playlists" distenation="/playlists">
                    <Playlists playLists={playLists} show={8} />
                </SectionTemplate>
            </div>
        </>
    );
};

export default withAuth(Dashboard);

// TODO
// 1. Get profile data from Spotify [done]
// 2. Display profile data
// 3. Get user's Playlists from Spotify [done]
// 4. Get User's top tracks from Spotify [done]
// 5. Get User's top artists from Spotify [done]
// 7. create protected routes components [done]
// 8. create component to display playlists [done]
// 9. create component to display top artists [done]
