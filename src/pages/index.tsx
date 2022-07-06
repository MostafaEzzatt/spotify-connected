import type { NextPage } from "next";
import PrimaryButtonLink from "../components/PrimaryButtonLink";

const Home: NextPage = () => {
    return (
        <div className="w-full h-screen bg-base flex justify-center items-center">
            <PrimaryButtonLink href="/api/login" text="Login With Spotify" />
        </div>
    );
};

export default Home;
