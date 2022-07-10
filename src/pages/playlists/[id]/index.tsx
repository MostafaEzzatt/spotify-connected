import { useEffect } from "react";
import getRequests from "../../../spotify/getRequest";
import paths from "../../../spotify/requestPaths";
import catchErrors from "../../../utils/catchError";

const List = () => {
    useEffect(() => {
        const getList = async () => {
            const listData = await getRequests(
                paths.playlist("5FuSBoolvor9fgR28WUNWq")
            );
        };
        catchErrors(getList)();
    }, []);

    return <div>List</div>;
};

export default List;
