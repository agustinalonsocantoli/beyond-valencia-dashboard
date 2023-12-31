import axios from "axios";
import { ProductInt } from "../../interfaces/ProductInt";

export const getBikes = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}bikes`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const getBikeById = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}bikes/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const addBike = async (newBike: ProductInt) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.post(
        `${import.meta.env.VITE_URL_API}bikes`,
        newBike,
        {   
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const updateBike = async ({
    id, 
    editBike
}: { 
    id: string, 
    editBike: ProductInt 
}) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.put(
        `${import.meta.env.VITE_URL_API}bikes/${id}`,
        editBike,
        {   
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const deleteBike = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.delete(
        `${import.meta.env.VITE_URL_API}bikes/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};