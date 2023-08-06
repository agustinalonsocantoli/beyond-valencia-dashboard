import axios from "axios";

export const getPartners = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}partners`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const addPartner = async (
    newPartner: {
        name: string,
        contact: string,
        email: string,
        phone: string,
        type: string
    }
) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.post(
        `${import.meta.env.VITE_URL_API}partners`,
        newPartner,
        {   
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};