import { StatusEnumTypes } from "../shared/Types/StatusEnumTypes";

export interface UserInt {
    id?: string | number | null;
    auth: boolean;
    username: string | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
}

export interface UpdateUserInt {
    username?: string;
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
}

export interface UserContextInt {
    user: UserInt;
    setUser: (action: any) => any;
    refreshUser: (updateUser: UpdateUserInt) => void;
    login: ( jwt: string, user: UserInt, navigate: (path: string) => void ) => any;
    logout: ( navigate: (path: string) => void, toast: any, statusType?: StatusEnumTypes, message?: string ) => any;
}