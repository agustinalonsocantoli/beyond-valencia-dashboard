import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { CustomTable } from "../../shared/components/CustomTable/CustomTable";
import { Topbar } from "../../shared/components/Topbar/Topbar";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { ProductInt } from "../../interfaces/ProductInt";
import { AxiosError, AxiosResponse } from "axios";
import { toastNotify } from "../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../shared/Types/StatusEnumTypes";
import { ActionsElements } from "../../shared/components/ColumnElements/ActionsElements";
import { TextElement } from "../../shared/components/ColumnElements/TextElement";
import { BiPlusCircle } from "react-icons/bi";
import { NewLockersModalForm } from "./Components/NewLockersModalForm";
import { EditLockersModalForm } from "./Components/EditLockersModalForm";
import { deleteLocker, getLockers } from "../../shared/middlewares/lockers.middleware";
import { useNavigate } from "react-router-dom";
import { useAuthContex } from "../../shared/context/auth.context";

export const Lockers = () => {
    const { logout } = useAuthContex();
    const navigate = useNavigate();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const [lockers, setLockers] = useState<ProductInt>();
    const [refreshTable, setRefreshTable] = useState<boolean>(true);
    const [lockersEdit, setLockersEdit] = useState<any>();

    useEffect(() => {
        refreshTable &&
            getLockers()
                .then((response: AxiosResponse) => {
                    setLockers(response?.data?.data);
                    console.log(response?.data?.data);
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
            key="title"
            field="title"
            header="Titulo"
            body={(rowData: any) => TextElement(
                {
                    title: { text: rowData?.title }
                }
            )}
        />,
        <Column
            key="description"
            field="description"
            header="Descripcion"
            body={(rowData: any) => TextElement(
                {
                    title: { text: rowData?.description }
                }
            )}
        />,
        <Column
            key="price.small"
            field="price.small"
            header="Small Price"
            body={(rowData: any) => TextElement(
                {
                    title: { text: `${rowData?.price?.small}€` }
                }
            )}
        />,
        <Column
            key="price.medium"
            field="price.medium"
            header="Medium Price"
            body={(rowData: any) => TextElement(
                {
                    title: { text: `${rowData?.price?.medium}€` }
                }
            )}
        />,
        <Column
            key="price.normal"
            field="price.normal"
            header="Normal Price"
            body={(rowData: any) => TextElement(
                {
                    title: { text: `${rowData?.price?.medium}€` }
                }
            )}
        />,
        <Column
            key=""
            field=""
            header=""
            body={(rowData) => ActionsElements({
                edit: {
                    onClick: () => {
                        setLockersEdit(rowData);
                        onOpenEdit();
                    },
                },
                remove: {
                    onClick: () => {
                        deleteLocker(rowData?._id)
                            .then(() => setRefreshTable(true))
                    },
                }
            })}
        />
    ]

    return (
        <Flex
            direction="column"
            w="100%"
        >
            <Topbar
                title="Bikes"
                buttons={[
                    {
                        label: "Nuevo producto",
                        onClick: () => onOpen(),
                        icon: BiPlusCircle
                    }
                ]}
            />

            <Flex
                w="100%"
                p="20px"
            >
                <CustomTable
                    data={lockers}
                    columns={columns}
                />
            </Flex>

            <NewLockersModalForm
                isOpen={isOpen}
                onClose={onClose}
                setRefresh={setRefreshTable}
            />

            <EditLockersModalForm
                isOpen={isOpenEdit}
                onClose={onCloseEdit}
                setRefresh={setRefreshTable}
                lockersEdit={lockersEdit}
                setLockersEdit={setLockersEdit}
            />
        </Flex>
    );
};