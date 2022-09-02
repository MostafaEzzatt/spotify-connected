import { GetServerSideProps } from "next";
import Link from "next/link";
import { useQuery } from "react-query";
import CustomeImage from "../../components/CustomeImage";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import withAuth from "../../components/protected/withAuth";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";

const Artist = ({ id }: { id: string }) => {
    const { data, isLoading } = useQuery(["artist"], () => {
        return getRequests(paths.sinalArtist(id));
    });

    if (isLoading) return <LoadingFullScreen />;

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <div className="min-w-min">
                <Link href={"/"}>
                    <a className="font-bold text-highlight hover:text-highlight-press">
                        {"<-"} Back Home
                    </a>
                </Link>
                <div className="mx-auto max-w-max px-6 sm:px-0">
                    {data.images.length > 0 && (
                        <CustomeImage
                            image={data?.images[0]?.url}
                            alt={
                                data.type == "user"
                                    ? data.display_name
                                    : data.name
                            }
                            type={data.type}
                        />
                    )}
                </div>
                <h1 className="break-words text-7xl font-black text-white sm:text-8xl">
                    {data.name}
                </h1>

                <div className="my-3 mx-auto flex max-w-min items-center gap-2 text-center text-sm text-link">
                    GENRES:
                    {data.genres.map((g: string) => {
                        return (
                            <span
                                key={g}
                                className=" whitespace-nowrap rounded-full bg-highlight-press px-3 text-lg capitalize text-white"
                            >
                                {g.trim()}
                            </span>
                        );
                    })}
                </div>

                <div className="flex justify-around">
                    <p className="text-sm text-link">
                        FOLLOWERS:{" "}
                        <span className="text-xl text-highlight">
                            {
                                parseInt(data.followers.total)
                                    .toLocaleString("en-US", {
                                        minimumFractionDigits: 2,
                                    })
                                    .split(".")[0]
                            }
                        </span>
                    </p>

                    <p className="text-sm text-link">
                        POPULARITY:{" "}
                        <span className="text-xl text-highlight">
                            {data.popularity}%
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
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
