import { Flex, useDisclosure, useToast } from "@chakra-ui/react";
import { CustomTable } from "../../shared/components/CustomTable/CustomTable";
import { useEffect, useState } from "react";
import { deleteCode, getCodes } from "../../shared/middlewares/codes.middleware";
import { AxiosResponse } from "axios";
import { toastNotify } from "../../shared/utils/toastNotify";
import { StatusEnumTypes } from "../../shared/Types/StatusEnumTypes";
import { Column } from "primereact/column";
import { TextElement } from "../../shared/components/ColumnElements/TextElement";
import { BadgeElement } from "../../shared/components/ColumnElements/BadgeElement";
import { DateElement } from "../../shared/components/ColumnElements/DateElement";
import { Topbar } from "../../shared/components/Topbar/Topbar";
import { CodeModalForm } from "./components/CodeModalForm";
import { ActionsElements } from "../../shared/components/ColumnElements/ActionsElements";
import { BiPlusCircle } from "react-icons/bi";

export const Codes = () => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [codes, setCodes] = useState<any>();
    const [refreshTable, setRefreshTable] = useState<boolean>(true);
    const [codeEdit, setCodeEdit] = useState<any>();
    const [editForm, setEditForm] = useState<boolean>(false);

    useEffect(() => {
        refreshTable &&
            getCodes()
                .then((response: AxiosResponse) => {
                    setCodes(response?.data?.data);
                    setRefreshTable(false)
                    console.log(response?.data?.data);
                })
                .catch(() => toastNotify(toast, StatusEnumTypes.ERROR, "Error en el servidor, actualice o contacte con soporte"))

    }, [refreshTable])

    const columns = [
        <Column
            key="code"
            field="code"
            header="Codigo"
            body={(rowData: any) => TextElement(
                {
                    title: { text: rowData?.code }
                }
            )}
        />,
        <Column
            key="name"
            field="name"
            header="Partner"
            body={(rowData: any) => TextElement(
                {
                    title: { text: rowData?.partner?.name }
                }
            )}
        />,
        <Column
            key="discount"
            field="discount"
            header="Descuento"
            body={(rowData: any) => TextElement(
                {
                    title: { text: `${rowData?.discount}%` }
                }
            )}
        />,
        <Column
            key="state"
            field="state"
            header="Estado"
            body={(rowData: any) => BadgeElement(
                {
                    content: rowData?.state,
                    isTrue: { color: "green", label: "Activado" },
                    isFalse: { color: "red", label: "Desactivado" }
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
                edit: {
                    onClick: () => {
                        setCodeEdit(rowData);
                        setEditForm(true);
                        onOpen();
                    },
                },
                remove: {
                    onClick: () => {
                        deleteCode(rowData?._id)
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
                title="Codigos de Descuento"
                buttons={[
                    {
                        label: "Nuevo codigo",
                        onClick: () => onOpen(),
                        icon: BiPlusCircle
                    }
                ]}
            />

            <CustomTable
                data={codes}
                columns={columns}
            />

            <CodeModalForm
                isOpen={isOpen}
                onClose={onClose}
                editForm={editForm}
                setEditForm={setEditForm}
                setRefresh={setRefreshTable}
                defaultValue={codeEdit}
                setCodeEdit={setCodeEdit}
            />
        </Flex>
    );
};