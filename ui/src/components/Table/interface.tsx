import type * as React from "react";

export type DefaultRecordType = Record<string, any>;

export type DataIndex = string | number;

export interface ColumnType {
    title: DataIndex;
    dataIndex: DataIndex;
    render?: (record: DefaultRecordType) => React.ReactNode;
    onCell?: GetComponentProps<DefaultRecordType>;
}

export type ColumnsType =
    readonly (ColumnType)[];

// ================= Customized =================
export type GetComponentProps<DataType> = (
    data: DataType,
    index?: number
) => React.HTMLAttributes<any> | React.TdHTMLAttributes<any>;

type Component<P> =
    | React.ComponentType<P>
    | React.ForwardRefExoticComponent<P>
    | React.FC<P>
    | keyof React.ReactHTML;

export type CustomizeComponent = Component<any>;

export type Order = 'asc' | 'desc';
