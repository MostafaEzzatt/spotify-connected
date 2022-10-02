import {
    DetailedHTMLProps,
    HTMLAttributes,
    useEffect,
    useRef,
    useState,
} from "react";
import Loading from "./svgs/Loading";

const InitialLoadingScreen = () => {
    const [visible, setVisible] = useState(true);
    const loading = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (loading.current && typeof loading.current != null) {
            loading.current.addEventListener("animationend", (event) => {
                setVisible(false);
            });
        }
    }, [loading]);

    if (!visible) return <></>;

    return (
        <div
            ref={loading}
            className={`initialLoading fixed top-0 left-0 z-50 flex h-screen w-full items-center justify-center bg-base`}
        >
            <Loading />
        </div>
    );
};

export default InitialLoadingScreen;
