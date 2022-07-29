import playListResponse from "../../types/playListResponse";
import artistsResponse from "../../types/spotifyArtistsResponse";
import CardItem from "./CardItem";

type Props = {
    data: artistsResponse | playListResponse;
    showLength: number;
};

const CardsList = (props: Props) => {
    const { data, showLength } = props;

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Array.isArray(data.items) &&
                data.items
                    ?.slice(0, showLength || data.items.length)
                    .map((item) => {
                        return <CardItem item={item} key={item.id} />;
                    })}
        </div>
    );
};

export default CardsList;
