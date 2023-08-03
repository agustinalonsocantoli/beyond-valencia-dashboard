import React, { useContext } from "react";
import { UpdateUserInt, UserContextInt, UserInt } from "../../interfaces/UserInt";

export const AuthContext = React.createContext<UserContextInt>({
    user: {
        auth: localStorage.getItem('token') ? true : false,
        username: null,
        email: null,
        firstName: null,
        lastName: null,
    },
    setUser: ( action: any ) => {},
    login: ( jwt: string, user: UserInt, navigate: (path: string) => void ) => {},
    logout: ( navigate: (path: string) => void, toast: any ) => {},
    refreshUser: (updateUser: UpdateUserInt) => {}
});

export const useAuthContex = () => {
    return useContext(AuthContext);
}