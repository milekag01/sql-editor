import React from "react";
import empty from '../assets/images/empty.png';

const EmptyList = ({title}) => {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                // justifyContent: 'center',
                alignItems: "center",
                height: "370px",
                letterSpacing: "1px",
                color: "#2e4a66",
            }}
        >
            <img
                src={empty}
                style={{
                    width: "150px",
                    marginBottom: "10px",
                    marginTop: "60px",
                }}
            />
            <h2>{title}</h2>
        </div>
    );
};

export default EmptyList;
