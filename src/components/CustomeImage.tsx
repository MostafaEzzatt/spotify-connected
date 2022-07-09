import Image from "next/image";

type Props = {
    image: string;
    alt: string;
    type: string;
};

const CustomeImage = (props: Props) => {
    const { image, alt, type } = props;
    return (
        <div className="w-full max-w-full">
            {typeof image === "string" ? (
                <Image
                    src={image}
                    alt={alt}
                    width={375}
                    height={375}
                    className={`w-full h-full bg-avatar ${
                        type === "user" ? "rounded-full" : "rounded"
                    }`}
                />
            ) : (
                <div
                    className={`w-full h-full  bg-avatar ${
                        type === "user" ? "rounded-full" : "rounded"
                    }`}
                ></div>
            )}
        </div>
    );
};

export default CustomeImage;
