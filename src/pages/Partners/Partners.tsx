import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { CustomTable } from "../../shared/components/CustomTable/CustomTable";
import { useEffect, useState } from "react";
import { getCodes } from "../../shared/middlewares/codes.middleware";
import { AxiosError, AxiosResponse } from "axios";
import { toastNotify } from "../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../shared/Types/StatusEnumTypes";
import { Column } from "primereact/column";
import { TextElement } from "../../shared/components/ColumnElements/TextElement";
import { BadgeElement } from "../../shared/components/ColumnElements/BadgeElement";
import { DateElement } from "../../shared/components/ColumnElements/DateElement";
import { Topbar } from "../../shared/components/Topbar/Topbar";
import { getPartners } from "../../shared/middlewares/partners.middleware";
import { useNavigate } from "react-router-dom";
import { useAuthContex } from "../../shared/context/auth.context";

export const Partners = () => {
    const toast = useToast();
    const { logout } = useAuthContex();
    const navigate = useNavigate();
    const [partners, setPartners] = useState<any>();
    const [refreshTable, setRefreshTable] = useState<boolean>(true);

    useEffect(() => {
        refreshTable &&
            getPartners()
                .then((response: AxiosResponse) => {
                    setPartners(response?.data?.data);
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
                        toastNotify(toast, StatusEnumTypes.ERROR, "Error en el servidor, actualice o contacte con soporte.")
                    }
                })

    }, [refreshTable])

    const columns = [
        <Column
            key="name"
            field="name"
            header="Nombre"
            body={(rowData: any) => TextElement(
                {
                    title: { text: rowData?.name }
                }
            )}
        />,
        <Column
            key="contact"
            field="contact"
            header="Contacto"
            body={(rowData: any) => TextElement(
                {
                    title: { text: rowData?.contact }
                }
            )}
        />,
        <Column
            key="email"
            field="email"
            header="Email"
            body={(rowData: any) => TextElement(
                {
                    title: { text: rowData?.email }
                }
            )}
        />,
        <Column
            key="phone"
            field="phone"
            header="Telefono"
            body={(rowData: any) => TextElement(
                {
                    title: { text: rowData?.phone }
                }
            )}
        />,
        <Column
            key="type"
            field="type"
            header="Tipo"
            body={(rowData: any) => TextElement(
                {
                    title: { text: rowData?.type }
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
        <Flex
            direction="column"
            w="100%"
        >
            <Topbar
                title="Partners"
            />

            <Flex
                w="100%"
                p="20px"
            >
                <CustomTable
                    data={partners}
                    columns={columns}
                    isLoading={refreshTable}
                />
            </Flex>
        </Flex>
    );
};