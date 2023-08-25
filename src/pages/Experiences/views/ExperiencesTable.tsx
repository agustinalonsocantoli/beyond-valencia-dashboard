import { Flex, useToast } from '@chakra-ui/react';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { deleteExperiences, getExperiences } from '../../../shared/middlewares/experiences.middleware';
import { AxiosResponse } from 'axios';
import { toastNotify } from '../../../shared/utils/toastNotify';
import { StatusEnumTypes } from '../../../shared/Types/StatusEnumTypes';
import { CustomTable } from '../../../shared/components/CustomTable/CustomTable';
// Components
import { BadgeElement } from '../../../shared/components/ColumnElements/BadgeElement';
import { TextElement } from '../../../shared/components/ColumnElements/TextElement';
import { DateElement } from '../../../shared/components/ColumnElements/DateElement';
import { PricesElements } from '../../../shared/components/ColumnElements/PricesElements';
import { ActionsElements } from '../../../shared/components/ColumnElements/ActionsElements';
import { useNavigate } from 'react-router-dom';
import { ExperiencesInt } from '../../../interfaces/ExperiencesInt';

export const ExperiencesTable = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const [experiences, setExperiences] = useState<ExperiencesInt>();
    const [refreshTable, setRefreshTable] = useState<boolean>(true);

    useEffect(() => {
        refreshTable &&
            getExperiences()
                .then((response: AxiosResponse) => {
                    setExperiences(response?.data?.data);
                    setRefreshTable(false)
                })
                .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error en el servidor, actualice o contacte con soporte."))

    }, [refreshTable])

    const onRowClick = async (e: any) =>
        navigate("/experiences/" + e.data?._id);

    const deleteExperience = (id: string) => {
        id &&
            deleteExperiences(id)
                .then(() => toastNotify(toast, StatusEnumTypes.SUCCESS, "Experience borrada con exito"))
                .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error al borrar Experience"))
    }

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
        <Column
            key=""
            field=""
            header=""
            body={(rowData) => ActionsElements({
                remove: {
                    onClick: () => {
                        deleteExperience(rowData?._id);
                        setRefreshTable(true);
                    },
                }
            })}
        />
    ]

    return (
        <Flex 
            w="100%"
            p="20px"
        >
            <CustomTable
                data={experiences}
                columns={columns}
                onRowClick={onRowClick}
            />
        </Flex>
    );
}