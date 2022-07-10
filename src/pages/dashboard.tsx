import React, { useEffect } from "react";
import catchErrors from "../utils/catchError";

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
import artistsResponse from "../types/spotifyArtistsResponse";
import topTracksResponse from "../types/spotifyTopTacks";

// Route Protection
import withAuth from "../components/protected/withAuth";

const Dashboard = () => {
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

    useEffect(() => {
        const getProfile = async () => {
            const playlistData = await getRequests(paths.playlists);
            setPlayLists(playlistData);

            const topArtistsData = await getRequests(paths.topArtistsMedium);
            setTopArtists(topArtistsData);

            const topTracksData = await getRequests(paths.topTracksShort);
            setTopTracks(topTracksData);

            setLoading(false);
        };
        catchErrors(getProfile)();
    }, []);

    if (loading) return <LoadingFullScreen />;

    return (
        <>
            <div className="container mx-auto flex max-w-screen-lg flex-col gap-y-10 px-6 pt-6 2xl:px-0">
                <SectionTemplate title="Top Artists" distenation="/top_artists">
                    <TopArtists artists={topArtists} show={8} />
                </SectionTemplate>

                <SectionTemplate title="Top Tracks" distenation="/top_tracks">
                    <TopTracks tracks={topTracks} show={8} />
                </SectionTemplate>

                <SectionTemplate
                    title="Playlists"
                    distenation="/playlists"
                    seeMore
                >
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
