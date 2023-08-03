import { DataTable } from 'primereact/datatable';
import { useSidebarView } from '../../context/sidebar.context';

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
    onRowClick = (e: any) => {},
    totalRecords,
    sortField,
    sortOrder,
    filterDisplay = "menu"
}: Props) => {
    const { sidebarView } = useSidebarView();

    return (
        <div className="card">
            <DataTable 
                emptyMessage="No se han encontrado resultados"
                value={data} 
                paginator 
                rows={5} 
                rowsPerPageOptions={[5, 10, 25, 50]} 
                tableStyle={{
                    width: sidebarView ? "calc(100vw - 175px)" : "100vw"
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
        </div>
    );
}