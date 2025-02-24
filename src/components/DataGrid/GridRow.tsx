import { memo } from "react";


const GridRow = ({
    data,
    columns,
    selected,
    onSelectionChange
}: GridRowProps) => {
    return (
        <tr>
            <td>
                <input type="checkbox" key={data['rowIdUnique']}
                    checked={selected}
                    onChange={(evt) => onSelectionChange(data['rowIdUnique'], evt.target.checked)} />
            </td>
            <MemoizedDataColumns data={data} columns={columns} />
        </tr>
    );
};

const DataColumns = ({data, columns}:{data: any, columns: any[]}) => {
    return columns.map((column, index) => (
            <td key={`${data['rowIdUnique']}-${column}-${index}`}>{data[column]}</td>
    ))
}

const MemoizedDataColumns = memo(DataColumns);

interface GridRowProps {
    data: any
    columns: string[];
    selected: boolean
    onSelectionChange: (rowId: number, isChecked: boolean) => void;
}

export { GridRow }
