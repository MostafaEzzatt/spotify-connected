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
import { trpc } from "../utils/trpc";
import { profileResponse } from "../types/spotifyAPIProfileResponse";

const Dashboard = ({ profile }: { profile: profileResponse }) => {
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

    const { mutateAsync: createUserProfile } =
        trpc.useMutation("profile.create");
    const { mutateAsync: createUser } = trpc.useMutation("user.create");

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
        if (!playLists || !topArtists || !topTracks || !profile) return;

        try {
            const user = await createUser({
                spotifyId: profile.id,
                displayName: profile.display_name,
                email: profile.email,
                image: profile?.images[0]?.url || "",
                country: profile.country,
            });

            if (user) {
                await createUserProfile({
                    playlists: JSON.stringify(playLists),
                    topArtists: JSON.stringify(topArtists),
                    topTracks: JSON.stringify(topArtists),
                    userId: user.id,
                });
            }
        } catch (error: any) {
            if (error.data.httpStatus === 500) {
                console.log("500 error");
            }
        }
    };

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
