const getUrlParam = (url: string, param: string) => {
    const search = new URLSearchParams(url.split("?")[1]);
    return search.get(param);
};

export default getUrlParam;
