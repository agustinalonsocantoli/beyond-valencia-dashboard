import axios from "axios";
import { ExperiencesInt } from "../../interfaces/ExperiencesInt";

export const getExperiences = async () => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}experiences`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const getExperienceById = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}experiences/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const addExperience = async (data: ExperiencesInt) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.post(
        `${import.meta.env.VITE_URL_API}experiences`,
        data,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const updateExperiences = async ({id, data}: {id: string, data: ExperiencesInt}) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.put(
        `${import.meta.env.VITE_URL_API}experiences/${id}`,
        data,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const deleteExperiences = async (id: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.delete(
        `${import.meta.env.VITE_URL_API}experiences/${id}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};