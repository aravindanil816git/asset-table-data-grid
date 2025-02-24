import { ReactNode, useEffect, useRef } from "react";

const GridActionHeader = ({ 
    colspan,
    selectedRowCount,
    isPartialSelected,
    headerSuffix,
    onSelectDeselectAll
}: GridActionHeaderProps) => {
    const checkAll = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(checkAll.current) {
            checkAll.current.indeterminate = isPartialSelected;
        }
      }, [checkAll, isPartialSelected]);
      
    return (
        <thead>
            <tr>
                <td>
                    <input ref={checkAll} type="checkbox" onChange={(evt) => onSelectDeselectAll(evt.target.checked)} />
                </td>
                <td colSpan={colspan}>
                    {selectedRowCount > 0 ? `${selectedRowCount} Selected` : "None Selected"} &nbsp;
                    <span>{headerSuffix}</span>
                </td>
            </tr>
        </thead>
    )
}

interface GridActionHeaderProps {
    colspan: number;
    selectedRowCount: number;
    isPartialSelected: boolean;
    onSelectDeselectAll: (isChecked: boolean) => void;
    headerSuffix?: ReactNode;
}

export { GridActionHeader }
