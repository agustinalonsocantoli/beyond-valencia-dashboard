import axios from "axios";

export const getToken = async (email: string, password: string) => {
    return axios.post(
        `${import.meta.env.VITE_URL_API}auth/login`, {
        username: email,
        password: password,
    }
    );
};