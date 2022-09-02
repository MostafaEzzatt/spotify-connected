import { toast } from "react-toastify";

function catchErrors(fn: Function) {
    return function <T>(...args: T[]) {
        return fn(...args).catch((error: any) => {
            toast.error(`Something went wrong`);
            console.log("Code", error.code, "Message", error.message, error);
            console.dir(error);
        });
    };
}
export default catchErrors;
