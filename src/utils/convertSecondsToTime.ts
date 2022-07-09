function convertSecondsToTime(seconds: number) {
    // ms to hours, minutes and seconds
    // convert ms to seconds
    const convertedSeconds = seconds / 1000;

    // convert seconds to hours, minutes and seconds
    const h = Math.floor(convertedSeconds / 3600);
    const m = Math.floor((convertedSeconds % 3600) / 60);
    const s = Math.floor(convertedSeconds % 60);

    // return hours, minutes and seconds
    return `${h > 0 ? h + ":" : ""}${m > 0 ? m + ":" : ""}${s}`;
}

export default convertSecondsToTime;
