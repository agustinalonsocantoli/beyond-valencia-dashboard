import axios from "axios";
import { ContentInt } from "../../interfaces/ContentInt";

export const getAllContent = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}content`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const getContentById = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}content/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const updateContent= async ({ id, editContent }: { id: string, editContent: ContentInt }) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.put(
        `${import.meta.env.VITE_URL_API}content/${id}`,
        editContent,
        {   
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};