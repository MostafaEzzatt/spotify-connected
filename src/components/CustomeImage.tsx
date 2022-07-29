import Image from "next/image";

type Props = {
    image: string | undefined;
    alt: string;
    type: string;
    width?: number;
    height?: number;
};

const CustomeImage = (props: Props) => {
    const { image, alt, type, width = 200, height = 200 } = props;

    if (!image) return <></>;

    return (
        <div className="w-full max-w-full">
            {typeof image === "string" ? (
                <Image
                    src={image}
                    alt={alt}
                    width={width}
                    height={height}
                    className={`h-full w-full bg-avatar ${
                        type === "user" || type === "artist"
                            ? "rounded-full"
                            : "rounded"
                    }`}
                />
            ) : (
                <div
                    className={`h-full w-full  bg-avatar ${
                        type === "user" ? "rounded-full" : "rounded"
                    }`}
                ></div>
            )}
        </div>
    );
};

export default CustomeImage;
