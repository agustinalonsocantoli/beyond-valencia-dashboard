import { DataTable } from 'primereact/datatable';
import { Skeleton } from 'primereact/skeleton';
import "./CustomTable.css"
import { Flex } from '@chakra-ui/react';
import { Column } from 'primereact/column';

interface Props {
    columns: JSX.Element[];
    data: any;
    style?: React.CSSProperties;
    onRowClick?: (e: any) => void;
    totalRecords?: number;
    sortField?: string;
    sortOrder?: number;
    filterDisplay?: "row" | "menu"
    isLoading: boolean;
}

export const CustomTable = ({
    columns,
    data,
    style,
    onRowClick = (e: any) => { },
    totalRecords,
    sortField,
    sortOrder,
    filterDisplay = "menu",
    isLoading
}: Props) => {

    const bodyTemplate = () => {
        return <Skeleton height={`75px`}></Skeleton>
    }

    const getSkeleton = () => {
        return [{}].map((c: any, index: number) => (
            <Column body={bodyTemplate} key={index} />
        ))
    }

    return (
        <Flex
            w="100%"
            border="1px solid #e2e8f0"
            borderRadius="10px"
            overflowY={"auto"}
        >
            {!isLoading ?
            <DataTable
                emptyMessage="No se han encontrado resultados"
                value={data}
                paginator
                rows={5}
                tableStyle={{
                    width: "100%"
                }}
                filterDisplay={filterDisplay}
                style={style}
                removableSort
                onRowClick={onRowClick}
                totalRecords={totalRecords}
                sortField={sortField}
                sortOrder={sortOrder as 0 | 1 | -1 | null | undefined}
            >
                {columns}
            </DataTable>
            :
            <DataTable
            value={[{}, {}, {}, {}, {}]}
            paginator
            rows={5}
            tableStyle={{
                width: "100%"
            }}
        >
            {getSkeleton()}
        </DataTable>
            }
        </Flex>
    );
}