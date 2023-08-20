import axios from "axios";
import { ProductInt } from "../../interfaces/ProductInt";

export const getLockers = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}lockers`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const getLockerById = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}lockers/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const addLocker = async (editLockers: ProductInt) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.post(
        `${import.meta.env.VITE_URL_API}lockers`,
        editLockers,
        {   
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const updateLockers = async ({
    id, 
    editLocker
}: {
    id: string, 
    editLocker: ProductInt
}) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.put(
        `${import.meta.env.VITE_URL_API}lockers/${id}`,
        editLocker,
        {   
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const deleteLocker = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.delete(
        `${import.meta.env.VITE_URL_API}lockers/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};