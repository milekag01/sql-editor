import React from "react";
import BoxHeader from "./BoxHeader";

const QueryBox = ({ runQuery, saveQuery, query, setQuery, onKeyPress }) => {
    return (
        <>
            <BoxHeader
                title="Run Query"
                subtitle="Press Shift+Enter or click play button to execute"
            >
                <span onClick={runQuery} title="Run query">
                    <i className="fa fa-play icon__button" aria-hidden="true"></i>
                </span>
                <span onClick={saveQuery} title="Save query">
                    <i className="fa fa-save icon__button" aria-hidden="true"></i>
                </span>
            </BoxHeader>
            
            <div style={{ marginRight: "32px" }}>
                <textarea
                    value={query}
                    placeholder="Enter your query ending with ;"
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyPress={onKeyPress}
                ></textarea>
            </div>
        </>
    );
};

export default QueryBox;
