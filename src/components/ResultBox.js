import React, { useState, useEffect } from "react";
import { CSVLink } from "react-csv";
import { isProcessing } from "../utils";
import TableLoader from './TableLoader';
import EmptyList from './EmptyList';

const ResultBox = ({
    fileRef,
    queryResults,
    tableHeaders,
    queryTime,
    toastMsg,
    makeQuery,
}) => {
    const [headerData, setHeaderData] = useState([]);

    const headers = () => {
        const csvHeaders = [];
        tableHeaders?.map((header) => {
            csvHeaders.push({
                label: header,
                key: header,
            });
        });
        setHeaderData(csvHeaders);
    };

    useEffect(() => {
        headers();
    }, [tableHeaders]);

    const csvReport = {
        filename: "result.csv",
        headers: headerData,
        data: queryResults,
    };

    return (
        <>
            <div className="block__box">
                <div className="block__box__title">
                    <div>
                        <h1>Results</h1>
                        <p>
                            {" "}
                            <em>
                                {`(Rows: ${queryResults?.length}, Columns: ${
                                    tableHeaders?.length
                                }, Query time: ${
                                    parseInt(queryTime) / 1000
                                } sec)`}
                            </em>
                        </p>
                    </div>

                    <div>
                        {queryResults?.length > 0 ? (
                            <CSVLink {...csvReport}>
                                <span
                                    onClick={() => {
                                        toastMsg("Preparing file");
                                    }}
                                    title="Export as CSV"
                                >
                                    <i
                                        className="fa fa-download icon__button"
                                        aria-hidden="true"
                                    ></i>
                                </span>
                            </CSVLink>
                        ) : null}
                    </div>
                </div>

                <div className="block__box__table" ref={fileRef}>
                    {isProcessing(makeQuery.status) ? (
                        <TableLoader />
                    ) : queryResults?.length > 0 ? (
                        <table>
                            <tbody>
                                <tr>
                                    {tableHeaders.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                                {queryResults.map((row, index) => (
                                    <tr key={index}>
                                        {Object.values(row).map(
                                            (col, index) => (
                                                <td key={index}>{col}</td>
                                            )
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <EmptyList title="No Results Found" />
                    )}
                </div>
            </div>
        </>
    );
};

export default ResultBox;
