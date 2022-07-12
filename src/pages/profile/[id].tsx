import type { GetStaticPropsContext } from "next";
import Playlists from "../../components/Playlists";
import ProfileHeader from "../../components/ProfileHeader";
import SectionTemplate from "../../components/SectionTemplate";
import TopArtists from "../../components/TopArtists";
import TopTracks from "../../components/TopTracks";

// prisma
import { prisma } from "../../server/db/client";

// types
import playListResponse from "../../types/playListResponse";
import { profileResponse } from "../../types/spotifyAPIProfileResponse";
import artistsResponse from "../../types/spotifyArtistsResponse";
import topTracksResponse from "../../types/spotifyTopTacks";

type Props = {
    profile: profileResponse;
    topArtists: artistsResponse;
    playlists: playListResponse;
    topTracks: topTracksResponse;
};

const UserProfile = (props: Props) => {
    const { profile, topArtists, playlists, topTracks } = props;

    return (
        <>
            <ProfileHeader profile={profile} />
            <div className="container mx-auto flex max-w-screen-lg flex-col gap-y-10 px-6 pt-6 2xl:px-0">
                <SectionTemplate title="Top Artists" distenation="/top_artists">
                    <TopArtists artists={topArtists} show={8} />
                </SectionTemplate>

                <SectionTemplate title="Top Tracks" distenation="/top_tracks">
                    <TopTracks tracks={topTracks} show={8} />
                </SectionTemplate>

                <SectionTemplate title="Playlists" distenation="/playlists">
                    <Playlists playLists={playlists} show={8} />
                </SectionTemplate>
            </div>
        </>
    );
};

export async function getStaticPaths() {
    try {
        const requestPaths = await prisma.user.findMany({
            select: { spotifyId: true },
        });

        const paths = requestPaths.map((user) => ({
            params: { id: user.spotifyId },
        }));

        return { paths, fallback: "blocking" };
    } catch (error) {
        return { paths: [], fallback: false };
    }
}

export async function getStaticProps({
    params,
    locale,
    locales,
    preview,
}: GetStaticPropsContext<{ id: string }>) {
    try {
        const user = await prisma.user.findFirst({
            where: { spotifyId: params?.id },
            select: {
                spotifyId: true,
                displayName: true,
                email: true,
                image: true,
                country: true,
                profile: true,
            },
        });

        if (!user) return { notFound: true };

        const userData: profileResponse = {
            id: user.spotifyId,
            display_name: user.displayName,
            email: user.email,
            images: [{ height: 0, url: user.image, width: 0 }],
            country: user.country,
            type: "user",
        };

        const topArtists: artistsResponse =
            user.profile &&
            user.profile.length >= 1 &&
            user.profile[0] !== undefined
                ? JSON.parse(user.profile[0]?.topArtists)
                : null;

        const playlists: playListResponse =
            user.profile &&
            user.profile.length >= 1 &&
            user.profile[0] !== undefined
                ? JSON.parse(user.profile[0]?.playlists)
                : null;

        const topTracks: topTracksResponse =
            user.profile &&
            user.profile.length >= 1 &&
            user.profile[0] !== undefined
                ? JSON.parse(user.profile[0]?.topTracks)
                : null;

        return {
            props: {
                profile: userData,
                topArtists,
                playlists,
                topTracks,
            },
            revalidate: 10,
        };
    } catch (error) {
        return { props: {}, revalidate: 3600 };
    }
}

export default UserProfile;
