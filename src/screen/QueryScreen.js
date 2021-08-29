import React, { useState, useEffect, useRef } from "react";
import {
    makeQueryAction,
    fetchAllTablesAction,
    saveQueryAction,
    removeQueryAction,
    addQueryHistoryAction,
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import QueryBox from "../components/QueryBox";
import SavedQueryList from "../components/SavedQueryList";
import QueryHistoryList from "../components/QueryHistoryList";
import ResultBox from "../components/ResultBox";

const QueryScreen = () => {
    const fileRef = useRef();
    const [nav, setNav] = useState(0);
    const [query, setQuery] = useState("");
    const [tableIndex, setTableIndex] = useState(-1);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(
            fetchAllTablesAction({
                data: `select name from sqlite_master where type='table'`,
            })
        );
    }, []);

    const queryResults = useSelector(
        (state) => state.entities.query.queryResults
    );
    const allTables = useSelector((state) => state.entities.query.allTables);
    const queryList = useSelector((state) => state.entities.query.queryList);
    const queryHistoryList = useSelector(
        (state) => state.entities.query.queryHistoryList
    );
    const queryTime = useSelector((state) => state.entities.query.queryTime);

    const tableHeaders =
        queryResults?.length > 0 ? Object.keys(queryResults[0]) : [];

    const makeQuery = useSelector((state) => state.requests.query.makeQuery);

    const toastMsg = (msg) => {
        toast.dark(msg, {
            position: "top-center",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        });
    };

    const toggleSidebar = () => {
        if (!sidebarOpen) {
            setSidebarOpen(true);
        }
    };
    const closeSidebar = () => {
        if (sidebarOpen) {
            setSidebarOpen(false);
        }
    };

    const toggleSavedQuery = (el) => {
        setNav(el);
    };

    const onKeyPress = (event) => {
        setTableIndex(-1);
        let actualQuery = query.split(";")[query.split(";")?.length - 2];

        if (event.key === "Enter" && event.shiftKey) {
            if (query) {
                dispatch(
                    makeQueryAction({ data: actualQuery }, (success) => {
                        if (success) {
                            dispatch(addQueryHistoryAction({ data: query }));
                            toastMsg("Query triggered");
                        } else {
                            toastMsg("Query invalid");
                        }
                    })
                );
            }
        }
    };
    const runQuery = () => {
        setTableIndex(-1);

        let actualQuery = query.split(";")[query.split(";")?.length - 2];

        if (query) {
            dispatch(
                makeQueryAction({ data: actualQuery }, (success) => {
                    if (success) {
                        dispatch(addQueryHistoryAction({ data: query }));
                        toastMsg("Query triggered");
                    } else {
                        toastMsg("Query invalid");
                    }
                })
            );
        }
    };

    const fetchTable = (table, index) => {
        const query = `SELECT * FROM ${table};`;
        setTableIndex(index);

        if (query) {
            dispatch(
                makeQueryAction({ data: query }, (success) => {
                    if (success) {
                        dispatch(addQueryHistoryAction({ data: query }));
                        toastMsg("Query triggered");
                    } else {
                        toastMsg("Query invalid");
                    }
                })
            );
        }
    };

    const saveQuery = () => {
        if (query) {
            dispatch(
                saveQueryAction({
                    data: query,
                })
            );
            toastMsg("Query saved");
        } else {
            toastMsg("Query invalid");
        }
    };

    const clickQuery = (query) => {
        setTableIndex(-1);
        let actualQuery = query?.data.split(";")[
            query?.data.split(";")?.length - 2
        ];

        if (query?.data) {
            dispatch(
                makeQueryAction({ data: actualQuery }, (success) => {
                    if (success) {
                        dispatch(addQueryHistoryAction(query));
                        toastMsg("Query triggered");
                    } else {
                        toastMsg("Query invalid");
                    }
                })
            );
        }
    };

    const removeSavedQuery = (event, data) => {
        event.stopPropagation();
        dispatch(removeQueryAction(data));
        toastMsg("Query removed");
    };

    return (
        <div className="container">
            <Header
                toggleSavedQuery={toggleSavedQuery}
                toggleSidebar={toggleSidebar}
                nav={nav}
            />

            <main>
                <div className="main__container">
                    <div className="block">
                        <div className="block__box">
                            {nav === 0 ? (
                                <QueryBox
                                    runQuery={runQuery}
                                    saveQuery={saveQuery}
                                    query={query}
                                    setQuery={setQuery}
                                    onKeyPress={onKeyPress}
                                />
                            ) : nav === 1 ? (
                                <SavedQueryList
                                    queryList={queryList}
                                    clickQuery={clickQuery}
                                    removeSavedQuery={removeSavedQuery}
                                />
                            ) : (
                                <QueryHistoryList
                                    queryHistoryList={queryHistoryList}
                                    clickQuery={clickQuery}
                                />
                            )}
                        </div>

                        <ResultBox
                            fileRef={fileRef}
                            queryResults={queryResults}
                            tableHeaders={tableHeaders}
                            queryTime={queryTime}
                            toastMsg={toastMsg}
                            makeQuery={makeQuery}
                        />
                    </div>
                </div>
            </main>

            <Sidebar
                sidebarOpen={sidebarOpen}
                tableIndex={tableIndex}
                closeSidebar={closeSidebar}
                database="testdata"
                databaseTables={allTables}
                fetchTable={fetchTable}
            />

            <ToastContainer
                position="top-center"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
            />
        </div>
    );
};

export default QueryScreen;
