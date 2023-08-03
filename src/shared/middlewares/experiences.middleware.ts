import axios from "axios";

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