import React, { useContext } from "react";
import { UpdateUserInt, UserContextInt, UserInt } from "../../interfaces/UserInt";
import { StatusEnumTypes } from "../Types/StatusEnumTypes";

export const AuthContext = React.createContext<UserContextInt>({
    user: {
        auth: localStorage.getItem('token') ? true : false,
        username: null,
        email: null,
        firstName: null,
        lastName: null,
        rol: null,
    },
    setUser: ( action: any ) => {},
    login: ( jwt: string, user: UserInt, navigate: (path: string) => void ) => {},
    logout: ( 
        navigate: (path: string) => void, 
        toast: any, 
        statusType = StatusEnumTypes.INFO, 
        message = "Sesion finalizada"
        ) => {},
    refreshUser: (updateUser: UpdateUserInt) => {}
});

export const useAuthContex = () => {
    return useContext(AuthContext);
}