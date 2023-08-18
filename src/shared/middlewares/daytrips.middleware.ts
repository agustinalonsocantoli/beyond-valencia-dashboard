import axios from "axios";

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