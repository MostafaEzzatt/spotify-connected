function catchErrors(fn: Function) {
    return function <T>(...args: T[]) {
        return fn(...args).catch((error: any) => {
            console.log(error);
        });
    };
}
export default catchErrors;
