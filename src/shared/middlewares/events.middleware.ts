import axios from "axios";
import { EventsInt } from "../../interfaces/EventsInt";

export const getEvents = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}events`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const getEventById = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}events/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const addEvent = async (data: EventsInt) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.post(
        `${import.meta.env.VITE_URL_API}events`,
        data,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const updateEvent = async ({id, data}: {id: string, data: EventsInt}) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.put(
        `${import.meta.env.VITE_URL_API}events/${id}`,
        data,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const deleteEvent = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.delete(
        `${import.meta.env.VITE_URL_API}events/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};