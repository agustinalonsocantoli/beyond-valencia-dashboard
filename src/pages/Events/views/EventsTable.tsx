import { Flex, useToast } from '@chakra-ui/react';
import { Column } from 'primereact/column';
import { useEffect, useState } from 'react';
import { AxiosError, AxiosResponse } from 'axios';
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
import { EventsInt } from '../../../interfaces/EventsInt';
import { getEvents, deleteEvent } from '../../../shared/middlewares/events.middleware';
import { useAuthContex } from '../../../shared/context/auth.context';

export const EventsTable = () => {
    const toast = useToast();
    const { logout } = useAuthContex();
    const navigate = useNavigate();
    const [events, setEvents] = useState<EventsInt>();
    const [refreshTable, setRefreshTable] = useState<boolean>(true);

    useEffect(() => {
        refreshTable &&
            getEvents()
                .then((response: AxiosResponse) => {
                    setEvents(response?.data?.data);
                    setRefreshTable(false)
                })
                .catch((error: AxiosError) => {
                    if(error?.response?.status === 401) {
                        logout(
                            navigate, 
                            toast, 
                            StatusEnumTypes.ERROR, 
                            "Su Token ha caducado, vuelva a iniciar sesion"
                        )
                    } else {
                        toastNotify(toast, StatusEnumTypes.ERROR, "Error al actualizar los datos")
                    }
                })

    }, [refreshTable])

    const onRowClick = async (e: any) =>
        navigate("/events/" + e.data?._id);

    const deleteEvents = (id: string) => {
        id &&
            deleteEvent(id)
                .then(() => toastNotify(toast, StatusEnumTypes.SUCCESS, "Event borrada con exito"))
                .catch((error: AxiosError) => {
                    if(error?.response?.status === 401) {
                        logout(
                            navigate, 
                            toast, 
                            StatusEnumTypes.ERROR, 
                            "Su Token ha caducado, vuelva a iniciar sesion"
                        )
                    } else {
                        toastNotify(toast, StatusEnumTypes.ERROR, "Error al borrar Event")
                    }
                })
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
            key="eventDate"
            field="eventDate"
            header="Fecha del Evento"
            body={(rowData: any) => DateElement({ content: rowData?.eventDate })}
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
                        deleteEvents(rowData?._id);
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
                data={events}
                columns={columns}
                onRowClick={onRowClick}
            />
        </Flex>
    );
}