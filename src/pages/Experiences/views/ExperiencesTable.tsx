import { useToast } from '@chakra-ui/react';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { getExperiences } from '../../../shared/middlewares/experiences.middleware';
import { AxiosResponse } from 'axios';
import { toastNotify } from '../../../shared/utils/toastNotify';
import { StatusEnumTypes } from '../../../shared/Types/StatusEnumTypes';
import { CustomTable } from '../../../shared/components/CustomTable/CustomTable';
// Components
import { BadgeElement } from '../../../shared/components/ColumnElements/BadgeElement';
import { TextElement } from '../../../shared/components/ColumnElements/TextElement';
import { DateElement } from '../../../shared/components/ColumnElements/DateElement';
import { ImageElement } from '../../../shared/components/ColumnElements/ImageElement';
import { PricesElements } from '../../../shared/components/ColumnElements/PricesElements';

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
            body={(rowData: any) => TextElement(
                {
                    title: { text: rowData?.title }
                }
            )}
        />,
        <Column
            key="subtitle"
            field="subtitle"
            header="Subtitle"
            body={(rowData: any) => TextElement(
                {
                    subtitle: {
                        text: rowData?.subtitle.text,
                        label: rowData?.subtitle?.label
                    }
                }
            )}
        />,
        <Column
            key="published"
            field="published"
            header="Published"
            body={(rowData: any) => BadgeElement(
                {
                    content: rowData?.published,
                    isTrue: { color: "green", label: "Publicado" },
                    isFalse: { color: "red", label: "Comming Soon" }
                }
            )}
        />,
        <Column
            key="groups"
            field="groups"
            header="Grupo"
            body={(rowData: any) => PricesElements(
                {
                    groups: rowData.groups,
                    groupType: "group"
                }
            )}
        />,
        <Column
            key="private"
            field="groups"
            header="Privado"
            body={(rowData: any) => PricesElements(
                {
                    groups: rowData.groups,
                    groupType: "private"
                }
            )}
        />,
        <Column
            key="createdAt"
            field="createdAt"
            header="Fecha de Creacion"
            body={(rowData: any) => DateElement({ content: rowData?.createdAt })}
        />,
    ]

    return (
        <CustomTable
            data={experiences}
            columns={columns}
        />
    );
}