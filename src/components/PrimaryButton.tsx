import React from "react";

const PrimaryButton = ({
    text,
    clickEven,
    disabled,
}: {
    text: string;
    clickEven: Function;
    disabled: boolean;
}) => {
    return (
        <button
            className="cursor-pointer rounded-full bg-highlight px-7 py-2 text-xl font-bold text-black transition-colors hover:scale-110"
            onClick={() => {
                clickEven();
            }}
            disabled={disabled}
        >
            {text}
        </button>
    );
};

export default PrimaryButton;
