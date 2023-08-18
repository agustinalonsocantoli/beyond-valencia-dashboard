import axios from "axios";
import { MultimediaInt } from "../../interfaces/MultimediaInt";

export const getAllMultimedia = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}multimedia`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const getMultimediaById = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}multimedia/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const updateMultimedia = async ({ id, editMultimedia }: { id: string, editMultimedia: MultimediaInt }) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.put(
        `${import.meta.env.VITE_URL_API}multimedia/${id}`,
        editMultimedia,
        {   
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};