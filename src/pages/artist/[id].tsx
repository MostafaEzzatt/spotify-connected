import { GetServerSideProps } from "next";
import { useInfiniteQuery, useQueries, useQuery } from "react-query";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import ProfileHeader from "../../components/ProfileHeader";
import withAuth from "../../components/protected/withAuth";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";

// types
import type { item } from "../../types/spotifyArtistsResponse";

const Artist = ({ id }: { id: string }) => {
    const { data, isLoading } = useQuery(["artist"], () => {
        return getRequests(paths.sinalArtist(id));
    });

    if (isLoading) return <LoadingFullScreen />;

    console.log(data);

    return <></>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    return {
        props: {
            id,
        },
    };
};

export default withAuth(Artist);
