const paths = {
    profile: "/me",
    playlists: (id: string) => {
        return id ? `/${id.split("/v1/")[1]}` : "/me/playlists";
    },
    playlist: (id: string) => {
        const spliting = id.split("/v1/");
        return spliting.length >= 2
            ? `/${id.split("/v1/")[1]}`
            : `/playlists/${id}`;
    },
    sinalArtist: (id: string) => {
        return `/artists/${id}`;
    },
    topArtistsShort: "/me/top/artists?time_range=short_term",
    topArtistsMedium: "/me/top/artists?time_range=medium_term",
    topTracksShort: "/me/top/tracks?time_range=short_term",
    topTracksMedium: "/me/top/tracks?time_range=short_term",
};

export default paths;
