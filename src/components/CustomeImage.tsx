import Image from "next/image";

type Props = {
    image: string | undefined;
    alt: string;
    type: string;
};

const CustomeImage = (props: Props) => {
    const { image, alt, type } = props;

    if (!image) return <></>;

    return (
        <div className="w-full max-w-full">
            {typeof image === "string" ? (
                <Image
                    src={image}
                    alt={alt}
                    width={200}
                    height={200}
                    className={`h-full w-full bg-avatar ${
                        type === "user" ? "rounded-full" : "rounded"
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
