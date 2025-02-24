import { useState } from 'react';
import rawData from '../../assets/sample.json';
import { DataGrid } from '../DataGrid';
import './index.css';


const AssetTable = () => {
    const [ downloadDeviceIdx, setDowloadDeviceIdx ] = useState<any>([]);
    const data = rawData.map((row) => {
        return {
            ...row,
            status: <AvailableStatus status={row.status} />
        }
    });

    const onRowSelectionChange = (selectedRows: number[]) => {
        const availableDeviceIdx = selectedRows.filter((rowId) => data[rowId] && rawData[rowId].status === "available");
        setDowloadDeviceIdx(availableDeviceIdx);
    }

    const onDownloadButtonClick = () => {
        let downloadAssets = "";
        downloadDeviceIdx.forEach((deviceIndex: number) => {
            downloadAssets += `Name:${rawData[deviceIndex].name} Device:${rawData[deviceIndex].device} Path:${rawData[deviceIndex].path} Status:${rawData[deviceIndex].status}
            \n`;
        });
        alert(`Downloaded assets: \n ${downloadAssets}`);
    }
    return (
        <DataGrid data={data} 
        headerSuffix={<button disabled={downloadDeviceIdx.length === 0} onClick={onDownloadButtonClick}>Download</button>}
        onRowSelectionChange={onRowSelectionChange} 
        />
    );
}

const AvailableStatus = ({ status }: { status: string }) => {
    return (
        <div className='status'>
            <div className={status === "available" ? "available-dot" : ""} />
            <div>{status}</div>
        </div>
    )
}

export { AssetTable }
