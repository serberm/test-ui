import React from "react";
import type {
    ColumnType,
    CustomizeComponent,
    DataIndex,
    DefaultRecordType,
} from "./interface";

interface InternalCellProps {
    record: DefaultRecordType;
    dataIndex: DataIndex;
    render?: ColumnType["render"];
    component?: CustomizeComponent;
}
function Cell({
    record,
    dataIndex,
    render,
    component: Component = "td",
}: InternalCellProps) {
    const childNode = React.useMemo<React.ReactNode>(() => {
        let returnChildNode;

        if (render) {
            const renderData = render(record);

            returnChildNode = renderData;
        } else {
            returnChildNode = <span>{record[dataIndex]}</span>;
        }

        return returnChildNode;
    }, [
        /* eslint-enable */
        dataIndex,
        record,
        render,
    ]);

    const componentProps: React.TdHTMLAttributes<HTMLTableCellElement> = {};
    return <Component {...componentProps}>{childNode}</Component>;
}

export default Cell;
