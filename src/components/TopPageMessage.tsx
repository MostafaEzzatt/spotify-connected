import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const TopPageMessage = ({
    message,
    resetMessage,
}: {
    message: string;
    resetMessage: Dispatch<SetStateAction<string>>;
}) => {
    const handleCopy = () => {
        if (!message) return;
        navigator.clipboard.writeText(message);
        toast.info("Profile Link copied to clipboard", {
            toastId: "profileLinkCopied",
        });
    };

    const handleClose = () => {
        resetMessage("");
    };

    return (
        <div
            className={`fixed flex gap-4 ${
                message ? "bottom-8" : "-bottom-8"
            } left-1/2 -translate-x-1/2 cursor-pointer rounded bg-gray-100 px-4 py-1 text-slate-700 transition-all hover:bg-slate-700 hover:text-gray-200`}
        >
            <div
                onClick={() => handleCopy()}
                className="flex items-center gap-3"
            >
                <p>Copy Profile Link</p>

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                </svg>
            </div>

            <button className="hover:bg-black/20" onClick={() => handleClose()}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
    );
};

export default TopPageMessage;
