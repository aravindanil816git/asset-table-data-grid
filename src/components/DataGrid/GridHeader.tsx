import { memo } from "react";

const GridHeader = ({ 
    columns 
}: GridHeaderProps
) => {

    return (
        <thead>
            <tr>
                <th></th>
                {columns.map((column, index) => (
                    <th key={index}>{column}</th>
                ))}
            </tr>
        </thead>
    );
};

interface GridHeaderProps {
    columns: string[]
}

const memoizedGridHeader = memo(GridHeader);

export { memoizedGridHeader as GridHeader } 
