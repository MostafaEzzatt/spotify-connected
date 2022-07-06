const generateRandomString = (stringLength: number = 16) => {
    let randomString = "";

    const POSSIBLE =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (let i = 0; i < stringLength; i++) {
        randomString += POSSIBLE.charAt(
            Math.floor(Math.random() * POSSIBLE.length)
        );
    }

    return randomString;
};

export default generateRandomString;
