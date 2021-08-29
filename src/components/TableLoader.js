import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const TableLoader = () => {
    return (
        <table>
            <tbody>
                <tr>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((header, index) => (
                        <th key={index}>
                            <SkeletonTheme
                                color="#fff"
                                highlightColor="#f3f4f6"
                            >
                                <Skeleton />
                            </SkeletonTheme>
                        </th>
                    ))}
                </tr>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((row, index) => (
                    <tr key={index}>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((col, index) => (
                            <td key={index}>
                                <SkeletonTheme
                                    color={row % 2 ? "#f3f4f6" : "#f3f4f6"}
                                    highlightColor={
                                        row % 2 ? "#fff" : "#f3f4f6"
                                    }
                                >
                                    <Skeleton />
                                </SkeletonTheme>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TableLoader;
