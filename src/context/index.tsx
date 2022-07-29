import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useState,
} from "react";
import playListResponse from "../types/playListResponse";
import { profileResponse } from "../types/spotifyAPIProfileResponse";
import artistsResponse from "../types/spotifyArtistsResponse";
import topTracksResponse from "../types/spotifyTopTacks";

interface AppContextInterface {
    profile: profileResponse | null;
    setProfile: Dispatch<SetStateAction<profileResponse | null>>;
    topArtists: artistsResponse | null;
    setTopArtists: Dispatch<SetStateAction<artistsResponse | null>>;
    topTracks: topTracksResponse | null;
    setTopTracks: Dispatch<SetStateAction<topTracksResponse | null>>;
    playLists: playListResponse | null;
    setPlayLists: Dispatch<SetStateAction<playListResponse | null>>;
}

type Props = {
    children: React.ReactNode;
};

const AppCtx = createContext<AppContextInterface | null>(null);

// Provider in your app

const AppContextProvider = (props: Props) => {
    const { children } = props;
    const [profile, setProfile] = useState<profileResponse | null>(null);
    const [topArtists, setTopArtists] = useState<artistsResponse | null>(null);
    const [topTracks, setTopTracks] = useState<topTracksResponse | null>(null);
    const [playLists, setPlayLists] = useState<playListResponse | null>(null);

    console.log({ profile, topArtists, topTracks, playLists }, "CTX");

    const val: AppContextInterface = {
        profile,
        setProfile,
        topArtists,
        setTopArtists,
        topTracks,
        setTopTracks,
        playLists,
        setPlayLists,
    };
    return <AppCtx.Provider value={val}>{children}</AppCtx.Provider>;
};

export const useAppContext = () => {
    const context = useContext(AppCtx);
    if (context === null) {
        throw new Error(
            "useAppContext must be used within a AppContextProvider"
        );
    }
    return context;
};

export default AppContextProvider;
