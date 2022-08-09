import type { GetStaticPropsContext } from "next";
import Head from "next/head";
import CardsList from "../../components/cards";
import Playlists from "../../components/Playlists";
import ProfileHeader from "../../components/ProfileHeader";
import SectionTemplate from "../../components/SectionTemplate";
import Table, { BodyType } from "../../components/Table";
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

    const heading = [
        {
            text: "#",
            hiddenSM: false,
        },
        {
            text: "Image",
            hiddenSM: false,
        },
        {
            text: "Name",
            hiddenSM: false,
        },
        {
            text: "Artist(s)",
            hiddenSM: true,
        },
        {
            text: "Duration",
            hiddenSM: false,
        },
        {
            text: "link",
            hiddenSM: false,
        },
    ];

    const body = topTracks?.items.slice(0, 8).map((track, index) => {
        return [
            {
                type: BodyType.TEXT as BodyType.TEXT,
                data: `${index + 1}`,
                hiddenSM: false,
            },
            {
                type: BodyType.IMAGE as BodyType.IMAGE,
                data: track.album?.images[0]?.url || "",
                alt: track.name,
                hiddenSM: false,
            },
            {
                type: BodyType.TEXT as BodyType.TEXT,
                data: track.name,
                hiddenSM: false,
            },
            {
                type: BodyType.ARRAY as BodyType.ARRAY,
                data: track.artists.map((artist) => {
                    return {
                        name: artist.name,
                    };
                }),
                hiddenSM: true,
            },
            {
                type: BodyType.NUMBER as BodyType.NUMBER,
                data: track.duration_ms,
                hiddenSM: false,
            },
            {
                type: BodyType.LINK as BodyType.LINK,
                data: track.external_urls.spotify,
                hiddenSM: false,
            },
        ];
    });

    return (
        <>
            <Head>
                <title>{`${profile.display_name[0]?.toUpperCase()}${profile.display_name.slice(
                    1
                )} Profile`}</title>
            </Head>
            <ProfileHeader profile={profile} />
            <div className="container mx-auto flex max-w-screen-lg flex-col gap-y-10 px-6 pt-6 2xl:px-0">
                <SectionTemplate title="Top Artists" distenation="/top_artists">
                    <CardsList data={topArtists} showLength={8} />
                </SectionTemplate>

                <SectionTemplate title="Top Tracks" distenation="/top_tracks">
                    <Table heading={heading} body={body} />
                </SectionTemplate>

                <SectionTemplate title="Top Artists" distenation="/top_artists">
                    <CardsList data={playlists} showLength={8} />
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
