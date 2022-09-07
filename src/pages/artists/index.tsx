import Link from "next/link";
import { useQuery, UseQueryResult } from "react-query";
import CustomeImage from "../../components/CustomeImage";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import withAuth from "../../components/protected/withAuth";
import SectionTemplate from "../../components/SectionTemplate";
import Info from "../../components/svgs/Info";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";
import artistsResponse from "../../types/spotifyArtistsResponse";

const Artists = () => {
    const { data, isError, isLoading }: UseQueryResult<artistsResponse> =
        useQuery(["topArtistsList"], () => getRequests(paths.topArtistsMedium));

    if (isLoading) return <LoadingFullScreen />;

    if (isError)
        return (
            <div className="rounded bg-slate-700 py-3 text-center text-lg font-bold text-gray-200">
                Something Went Wrong
            </div>
        );

    return (
        <div className="container mx-auto flex max-w-screen-lg flex-col gap-y-10 px-6 pt-6 pb-14 2xl:px-0">
            <SectionTemplate title="Artists" distenation="/artists">
                <ul className="grid grid-cols-2 gap-4">
                    {data?.items
                        .sort((a, b) => b.popularity - a.popularity)
                        .map((artist) => (
                            <li
                                key={artist.id}
                                className="hover col-span-1 rounded border-2 border-solid border-transparent border-b-headerBackground/10 px-2 py-2 transition-colors hover:border-headerBackground"
                            >
                                <Link href={`/artists/${artist.id}`}>
                                    <a className="group">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 ">
                                                <div className="h-16 w-16">
                                                    <CustomeImage
                                                        alt={artist.name}
                                                        type={artist.type}
                                                        image={
                                                            artist.images[
                                                                artist.images
                                                                    .length - 1
                                                            ]?.url
                                                        }
                                                        width={64}
                                                        height={64}
                                                    />
                                                </div>
                                                <p className="text-gray-100">
                                                    {artist.name}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="inline-block capitalize text-highlight">
                                                    popularity:{" "}
                                                    {artist.popularity}%
                                                </p>

                                                <span className="ml-3 inline-block align-middle text-headerBackground/25 transition-colors group-hover:text-highlight/75">
                                                    <Info />
                                                </span>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
                            </li>
                        ))}
                </ul>
            </SectionTemplate>
        </div>
    );
};

export default withAuth(Artists);
