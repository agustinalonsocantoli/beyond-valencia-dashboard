import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { CustomTable } from "../../shared/components/CustomTable/CustomTable";
import { Topbar } from "../../shared/components/Topbar/Topbar";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import { ProductInt } from "../../interfaces/ProductInt";
import { AxiosResponse } from "axios";
import { toastNotify } from "../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../shared/Types/StatusEnumTypes";
import { getBikes } from "../../shared/middlewares/bikes.middleware";
import { ActionsElements } from "../../shared/components/ColumnElements/ActionsElements";
import { TextElement } from "../../shared/components/ColumnElements/TextElement";
import { BiPlusCircle } from "react-icons/bi";
import { NewBikesModalForm } from "./Components/NewBikesModalForm";
import { EditBikesModalForm } from "./Components/EditBikesModalForm";

export const Bikes = () => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const [bikes, setBikes] = useState<ProductInt>();
    const [refreshTable, setRefreshTable] = useState<boolean>(true);
    const [bikeEdit, setBikeEdit] = useState<any>();

    useEffect(() => {
        refreshTable &&
            getBikes()
                .then((response: AxiosResponse) => {
                    setBikes(response?.data?.data);
                    setRefreshTable(false)
                })
                .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error en el servidor, actualice o contacte con soporte"))

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
                    title: { text: `${rowData?.price?.medium}€`}
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
                        setBikeEdit(rowData);
                        onOpenEdit();
                    },
                },
                remove: {
                    onClick: () => {
                        // deleteCode(rowData?._id)
                        // .then(() => setRefreshTable(true))
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

            <CustomTable
                data={bikes}
                columns={columns}
            />

            <NewBikesModalForm
                isOpen={isOpen}
                onClose={onClose}
                setRefresh={setRefreshTable}
            />

            <EditBikesModalForm 
                isOpen={isOpenEdit}
                onClose={onCloseEdit}
                setRefresh={setRefreshTable}
                bikeEdit={bikeEdit}
                setBikeEdit={setBikeEdit}
            />
        </Flex>
    );
};