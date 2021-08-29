import { request } from "./APICentral";

export const makeQuery = (data) => {
    // console.log(data)
    return request(
        { url: `/query`, method: "POST", data },
    );
};

export const fetchAllTables = (data) => {
    // console.log(data)
    return request(
        { url: `/query`, method: "POST", data },
    );
};
