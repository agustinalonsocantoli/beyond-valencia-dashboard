// React 
import { Navigate, Outlet } from "react-router-dom";
// Hook
import { useAuthContex } from "../../context/auth.context";

interface Props {
    isRoleAllowed: boolean;
}

export const RequireAuth = ({ isRoleAllowed }: Props) => {
    const { user } = useAuthContex();
    
    return(
        !user?.auth 
        ? <Navigate to={"/login"} />
        : user?.auth && !isRoleAllowed 
            ? <Navigate to={"/"} />
            : <Outlet />
    );
};