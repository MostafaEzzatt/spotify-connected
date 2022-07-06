import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import PrimaryButtonLink from "../components/PrimaryButtonLink";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
    return (
        <div className="w-full h-screen bg-base flex justify-center items-center">
            <PrimaryButtonLink href="/api/login" text="Login With Spotify" />
        </div>
    );
};

export default Home;
