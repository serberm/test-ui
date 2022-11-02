import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";

import { useLazyQuery, useMutation } from "@apollo/client";
import { ALLAGREEMENTS } from "../../../API/agreement";
import { UPDATEPRIVATEITEM } from "../../../API/privateItem";
import Table from "../../../components/Table";
import { AGREEMENT_VIEW_ROUTE_FACTORY } from "../../../routes.const";
import { dispatchAgreementEditValue } from "../actions";
import { hasAdminCapability } from "../../../utils/capabilities";
import { AgreementData, IPrivateItem, IAgreement } from "../../../types";
import {
    currencyArray,
    agreementType,
    trancheArray,
} from "../../../utils/constants";

import { formatCurrency, fromBigInt } from "../../../utils/bigInt";
import { formatAndDisplayDate } from "../../../utils/date";
import type { ColumnType, Order, DataIndex } from "../../../components/Table/interface";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: "absolute",
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
}));

interface IAgreementListProps {
    isAdmin: boolean;
    updateAgreementEdit: Function;
    agreementEdit: any;
}

const AgreementContainer = ({
    agreementEdit,
    updateAgreementEdit,
    isAdmin,
    ...rest
}: IAgreementListProps) => {
    const history = useHistory();
    const classes = useStyles();

    const [page, setPage] = useState<number>(0);
    const [perPage, setPerPage] = useState<number>(10);
    const [sortField, setSortField] = useState<DataIndex>("Cardholder");
    const [sortOrder, setSortOrder] = useState<Order>("asc");
    const [filter, setFilter] = useState<object>({});

    const columns: ColumnType[] = [
        {
            title: "Cardholder",
            dataIndex: "Cardholder",
            render: (record) => {
                return <>{getCardholder(record as IAgreement) || "-"}</>;
            },
        },
        {
            title: "Owner",
            dataIndex: "Owner",
            render: (record) => {
                return <>{getOwnerName(record as IAgreement) || "-"}</>;
            },
        },
        {
            title: "Agreement",
            dataIndex: "Agreement",
            render: (record) => {
                return (
                    <>
                        {agreementType[
                            record.type as keyof typeof agreementType
                        ] || ""}
                    </>
                );
            },
        },
        {
            title: "Tranche",
            dataIndex: "Tranche",
            render: (record) => {
                return (
                    <>
                        {trancheArray[
                            record.tranche as keyof typeof trancheArray
                        ] || ""}
                    </>
                );
            },
        },
        {
            title: "Maturity Date",
            dataIndex: "Maturity Date",
            render: (record) => {
                return <>{formatAndDisplayDate(record.maturityDate)}</>;
            },
        },
        {
            title: "Currency",
            dataIndex: "Currency",
            render: (record) => {
                return (
                    <>
                        {currencyArray[
                            record.currency as keyof typeof currencyArray
                        ] || ""}
                    </>
                );
            },
        },
        {
            title: "Agreement size",
            dataIndex: "Agreement size",
            render: (record) => {
                return (
                    <>
                        {formatCurrency(
                            fromBigInt(record.agreementSize),
                            record.currency
                        )}
                    </>
                );
            },
        },
        {
            title: "Access Rights",
            dataIndex: "Access Rights",
            render: (record) => {
                const access = isAdmin || record?.PrivateItem?.private;
                return (
                    <>
                        {access ? (
                            <div className={"lock-container"}>
                                <LockIcon fontSize={"small"} />
                                <label>Private</label>
                            </div>
                        ) : (
                            <div
                                className={
                                    "lock-open-container agreement-edit-access-container"
                                }
                                onClick={(e) => {
                                    e.stopPropagation();
                                    editHandler(record.id);
                                }}
                            >
                                <LockOpenIcon fontSize={"small"} />
                                <label>Public</label>
                            </div>
                        )}
                    </>
                );
            },
        },
    ];

    const [
        getAllAgreements,
        {
            loading: agreementsListLoading,
            error: agreementsListError,
            data: { allAgreements = [] } = {},
        },
    ] = useLazyQuery<AgreementData>(ALLAGREEMENTS);

    const [
        updatePrivateItem,
        { data, loading: updatePrivateItemLoading, error },
    ] = useMutation<IPrivateItem>(UPDATEPRIVATEITEM);

    useEffect(() => {
        getAllAgreements({
            variables: { page, perPage, sortField, sortOrder, filter },
        });
    }, []);

    const privateAccessRequest = (id: string) => {
        updatePrivateItem({ variables: { id: id, private: true } });
        updateAgreementEdit("modalRequest", false);
    };

    const editHandler = (id: string) => {
        updateAgreementEdit(
            "modalRequest",
            allAgreements.find((el) => el.id === id)?.id
        );
    };

    const rowClickHandler = (id: string) => {
        const viewRoute = AGREEMENT_VIEW_ROUTE_FACTORY(id);
        history.push(viewRoute);
    };

    const getOwnerName = (agreement: IAgreement) => {
        return agreement?.Entity?.name;
    };

    const getCardholder = (agreement: IAgreement) => {
        return agreement?.Entity?.name;
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: DataIndex
    ) => {
        const isAsc = sortField === property && sortOrder === "asc";
        setSortOrder(isAsc ? "desc" : "asc");
        setSortField(property);
    };
    return (
        <>
            <Table
                columns={columns}
                data={allAgreements}
                loading={agreementsListLoading}
                error={agreementsListError}
                onRowClick={rowClickHandler}
                handleChangePage={handleChangePage}
                handleChangeRowsPerPage={handleChangeRowsPerPage}
                onRequestSort={handleRequestSort}
                rowsPerPage={perPage}
                page={page}
                order={sortOrder}
                orderBy={sortField}
            />
            {agreementEdit.get("modalRequest") && (
                <Dialog
                    onClose={() => updateAgreementEdit("modalRequest", false)}
                    aria-labelledby="simple-dialog-title"
                    open={true}
                >
                    <DialogTitle
                        id="simple-dialog-title"
                        className={classes.root}
                    >
                        <Typography variant="h6">
                            {"Request private access"}
                        </Typography>

                        <IconButton
                            className={classes.closeButton}
                            aria-label="close"
                            onClick={() =>
                                updateAgreementEdit("modalRequest", false)
                            }
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent>
                        <p>
                            You are about to send a request to gain private
                            access to this agreement. Proceed?
                        </p>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={() =>
                                updateAgreementEdit("modalRequest", false)
                            }
                            color="secondary"
                        >
                            Close
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() =>
                                privateAccessRequest(
                                    agreementEdit.get("modalRequest")
                                )
                            }
                        >
                            Send
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};
const mapStateToProps = (state: {
    get: (arg0: string) => boolean;
    getIn: (arg0: string[]) => any;
}) => {
    return {
        error: state.get("apiError") === true,
        userGroups: state.get("userGroups"),
        userId: state.get("roleId"),
        isAdmin: hasAdminCapability(state),
        agreementEdit: state.getIn(["agreements", "agreementEdit"]),
    };
};

const mapDispatchToProps = (
    dispatch: (arg0: { type: string; key: any; value: any }) => any
) => {
    return {
        updateAgreementEdit: (k: any, v: any) =>
            dispatch(dispatchAgreementEditValue(k, v)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgreementContainer);
