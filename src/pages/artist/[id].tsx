import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { useInfiniteQuery } from "react-query";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";

const Artist = ({ id }) => {
    const { data } = useInfiniteQuery(["artist"], () => {
        return getRequests(paths.sinalArtist(id));
    });

    console.log(data);

    return <div>Artist</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id } = context.query;

    return {
        props: {
            id,
        },
    };
};

export default Artist;
