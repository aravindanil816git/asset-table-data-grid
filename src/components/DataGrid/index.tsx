import { ReactNode, useState } from 'react';
import { GridHeader } from './GridHeader';
import { GridRow } from './GridRow';
import './index.css';
import { GridActionHeader } from './GridActionHeader';

export const DataGrid = ({
    data,
    onRowSelectionChange,
    headerSuffix
}: DataGridProps) => {
    const [selectedRowIds, setSelectionRowIds] = useState<number[]>([]);

    if(!data || data.length === 0) {
        return <div>No data to display</div>
    }

    const columns = Object.keys(data[0]);

    const rowSupportedData = data.map((row, index) => { return { ...row, rowIdUnique: index } });

    const onSelectionChange = (rowId: number, isChecked: boolean) => {
        let _selectedRowIds = [];
        if (isChecked) {
            _selectedRowIds =[...selectedRowIds, rowId];
        } else {
            _selectedRowIds = selectedRowIds.filter((id: number) => id !== rowId);
        }
        setSelectionRowIds(_selectedRowIds)
        onRowSelectionChange(_selectedRowIds)
    }

    const isRowSelected = (rowId: number) => selectedRowIds.includes(rowId);

    const onSelectDeselectAll = (isChecked: boolean) => {
        let _selectedRowIds = [];
        if (isChecked) {
            _selectedRowIds = rowSupportedData.map(row => row['rowIdUnique']);
        }
        setSelectionRowIds(_selectedRowIds)
        onRowSelectionChange(_selectedRowIds)
    }

    const isPartialSelected = selectedRowIds.length > 0 && selectedRowIds.length < rowSupportedData.length;

    return (
        <table>
            <GridActionHeader
                isPartialSelected={isPartialSelected}
                selectedRowCount={selectedRowIds.length}
                headerSuffix={headerSuffix}
                colspan={columns.length} onSelectDeselectAll={onSelectDeselectAll} />
            <GridHeader columns={columns} />
            <tbody>
                {
                    rowSupportedData.map((row, index) => (
                        <GridRow key={index}
                            selected={isRowSelected(row['rowIdUnique'])}
                            data={row} columns={columns}
                            onSelectionChange={onSelectionChange} />
                    ))
                }
            </tbody>
        </table>
    )
}


interface DataGridProps {
    data: any[];
    onRowSelectionChange: (selectedRows: any[]) => void;
    headerSuffix?: ReactNode;
}