import axios from "axios";

export const getCodes = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}codes`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const getCodeById = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}codes/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const addCodes = async (
    newCode: { 
        code: string, 
        discount: number, 
        state: boolean, 
        partner: {
            name: string,
            contact: string,
            email: string,
            phone: string,
            type: string
        }
    }
) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.post(
        `${import.meta.env.VITE_URL_API}codes`,
        newCode,
        {   
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const updateCodes = async ({
    id, 
    editCode
}: {
    id: string, 
    editCode: { 
        code?: string, 
        discount?: number, 
        state?: boolean, 
        partner?: {
            name: string,
            contact: string,
            email: string,
            phone: string,
            type: string
        }
    }
}) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.put(
        `${import.meta.env.VITE_URL_API}codes/${id}`,
        editCode,
        {   
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const deleteCode = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.delete(
        `${import.meta.env.VITE_URL_API}codes/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};