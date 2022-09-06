import React from "react";
import Loading from "./svgs/Loading";

const LoadingFullScreen = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-base">
            <Loading />
        </div>
    );
};

export default LoadingFullScreen;
