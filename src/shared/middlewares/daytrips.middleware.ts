import axios from "axios";
import { DaystripsInt } from "../../interfaces/DaytripsInt";

export const getDaytrips = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}daytrips`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const getDaytripById = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}daytrips/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const addDaytrip = async (data: DaystripsInt) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.post(
        `${import.meta.env.VITE_URL_API}daytrips`,
        data,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const updateDaytrip = async ({id, data}: {id: string, data: DaystripsInt}) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.put(
        `${import.meta.env.VITE_URL_API}daytrips/${id}`,
        data,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const deleteDaytrip = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.delete(
        `${import.meta.env.VITE_URL_API}daytrips/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};