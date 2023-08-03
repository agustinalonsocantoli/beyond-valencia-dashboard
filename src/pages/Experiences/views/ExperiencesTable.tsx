import { Flex, Text, useToast } from '@chakra-ui/react';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { getExperiences } from '../../../shared/middlewares/experiences.middleware';
import { AxiosResponse } from 'axios';
import { toastNotify } from '../../../shared/utils/toastNotify';
import { StatusEnumTypes } from '../../../shared/Types/StatusEnumTypes';
import { CustomTable } from '../../../shared/components/CustomTable/CustomTable';

export const ExperiencesTable = () => {
    const toast = useToast();
    const [experiences, setExperiences] = useState<any>();
    const [refreshTable, setRefreshTable] = useState<boolean>(true);

    useEffect(() => {
        refreshTable &&
            getExperiences()
                .then((response: AxiosResponse) => {
                    setExperiences(response?.data?.data);
                    setRefreshTable(false)
                    console.log(response?.data?.data);
                })
                .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error en el servidor, actualice o contacte con soporte."))

    }, [refreshTable])

    const columns = [
        <Column
            key="title"
            field="title"
            header="Title"
            body={(rowData: any) =>
                <Text>
                    {rowData?.title}
                </Text>
            }
        />
    ]

    return (
        <CustomTable
            data={experiences}
            columns={columns}
        />
    );
}