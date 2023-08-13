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

export const getExperienceBySlug = async (slug: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.get(
        `${import.meta.env.VITE_URL_API}experiences/${slug}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const updateExperiences = async ({slug, data}: {slug: string, data: ExperiencesInt}) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.put(
        `${import.meta.env.VITE_URL_API}experiences/${slug}`,
        data,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};

export const deleteExperiences = async (slug: string) => {
    const token = localStorage.getItem('token') ? localStorage.getItem('token') : '';

    return await axios.delete(
        `${import.meta.env.VITE_URL_API}experiences/${slug}`,
        {
            headers: {
                "x-access-token": `${token}`
            }
        }
    );
};