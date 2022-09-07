import { useQuery } from "react-query";
import LoadingFullScreen from "../../components/LoadingFullScreen";
import withAuth from "../../components/protected/withAuth";
import SectionTemplate from "../../components/SectionTemplate";
import getRequests from "../../spotify/getRequest";
import paths from "../../spotify/requestPaths";

const Artists = () => {
    const { data, isError, isLoading } = useQuery(["topArtistsList"], () =>
        getRequests(paths.topArtistsMedium)
    );

    if (isLoading) return <LoadingFullScreen />;
    console.log(data);
    return (
        <div className="container mx-auto flex max-w-screen-lg flex-col gap-y-10 px-6 pt-6 pb-14 2xl:px-0">
            <SectionTemplate
                title="Artists"
                distenation="/artists"
            ></SectionTemplate>
        </div>
    );
};

export default withAuth(Artists);
