import { DataTable } from 'primereact/datatable';
import "./CustomTable.css"
import { Flex } from '@chakra-ui/react';

interface Props {
    columns: JSX.Element[];
    data: any;
    style?: React.CSSProperties;
    onRowClick?: (e: any) => void;
    totalRecords?: number;
    sortField?: string;
    sortOrder?: number;
    filterDisplay?: "row" | "menu"
}

export const CustomTable = ({
    columns,
    data,
    style,
    onRowClick = (e: any) => { },
    totalRecords,
    sortField,
    sortOrder,
    filterDisplay = "menu"
}: Props) => {

    return (
        <Flex
            w="100%"
            border="1px solid #e2e8f0"
            borderRadius="10px"
            overflow="hidden"
        >
            <DataTable
                emptyMessage="No se han encontrado resultados"
                value={data}
                paginator
                rows={10}
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
        </Flex>
    );
}