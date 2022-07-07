function catchErrors(fn: Function) {
    return function <T>(...args: T[]) {
        return fn(...args).catch((error: any) => {
            console.log("Code", error.code, "Message", error.message, error);
        });
    };
}
export default catchErrors;
