import React from "react";
import { ApolloError } from "@apollo/client";
import MuiTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import {
    createStyles,
    withStyles,
    makeStyles,
    Theme,
} from "@material-ui/core/styles";

import type { ColumnType, Order, DataIndex } from "./interface";
import Cell from "./Cell";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        paper: {
            width: "100%",
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: "rect(0 0 0 0)",
            height: 1,
            margin: -1,
            overflow: "hidden",
            padding: 0,
            position: "absolute",
            top: 20,
            width: 1,
        },
    })
);

interface ListProps<RecordType = Record<string, any>> {
    data: RecordType[];
    columns: ColumnType[];
    loading: boolean;
    error: ApolloError | undefined;
    rowsPerPage: number;
    page: number;
    onRowClick: (id: string) => void;
    handleChangePage: (event: unknown, newPage: number) => void;
    handleChangeRowsPerPage: (
        event: React.ChangeEvent<HTMLInputElement>
    ) => void;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: DataIndex
    ) => void;
    order: Order;
    orderBy: DataIndex;
}
const StyledTableSortLabel = withStyles((theme: Theme) =>
    createStyles({
        root: {
            color: "white",
            "&:hover": {
                color: "white",
            },
            "&$active": {
                color: "white",
            },
        },
        active: {},
        icon: {
            color: "inherit !important",
        },
    })
)(TableSortLabel);

const Table = ({
    orderBy,
    order,
    loading,
    error,
    data,
    columns,
    onRowClick,
    rowsPerPage = 20,
    page,
    handleChangePage,
    handleChangeRowsPerPage,
    onRequestSort,
}: ListProps) => {
    const classes = useStyles();
    if (loading) {
        return (
            <div className={"app-content div-table-color"}>
                <div className="spinner-border text-primary">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }
    if (error) return <p>Error :(</p>;

    const createSortHandler =
        (property: string | number) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };
    return (
        <>
            <TableContainer>
                <MuiTable
                    className={
                        "table table-dark app-content interactive clickable"
                    }
                >
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    sortDirection={
                                        orderBy === column.dataIndex
                                            ? order
                                            : false
                                    }
                                >
                                    <StyledTableSortLabel
                                        active={orderBy === column.dataIndex}
                                        direction={
                                            orderBy === column.dataIndex
                                                ? order
                                                : "asc"
                                        }
                                        onClick={createSortHandler(
                                            column.dataIndex
                                        )}
                                        IconComponent={ArrowDropUpIcon}
                                        style={{ color: "white" }}
                                    >
                                        {column.title}
                                        {orderBy === column.dataIndex ? (
                                            <span
                                                className={
                                                    classes.visuallyHidden
                                                }
                                            >
                                                {order === "desc"
                                                    ? "sorted descending"
                                                    : "sorted ascending"}
                                            </span>
                                        ) : null}
                                    </StyledTableSortLabel>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data &&
                            data
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((record, index) => {
                                    return (
                                        <TableRow
                                            className={"agreement-list-row"}
                                            onClick={() =>
                                                onRowClick(record.id as string)
                                            }
                                        >
                                            {columns.map((column) => (
                                                <Cell
                                                    record={record}
                                                    {...column}
                                                />
                                            ))}
                                        </TableRow>
                                    );
                                })}
                    </TableBody>
                </MuiTable>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    );
};

export default Table;
