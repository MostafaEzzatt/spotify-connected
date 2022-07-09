import { logout } from "../spotify/getAccessToken";

const Logout = () => {
    return (
        <div className="max-w-screen-lg mx-auto pt-6 absolute top-0 right-12">
            <button
                onClick={() => logout()}
                className="bg-black px-4 text-white py-1 rounded-full"
            >
                Logout
            </button>
        </div>
    );
};

export default Logout;
