// React 
import { Navigate, Outlet } from "react-router-dom";
// Hook
import { useAuthContex } from "../../context/auth.context";

export const RequireAuth = () => {
    const { user } = useAuthContex();
    
    return(
        !user?.auth 
        ? <Navigate to={"/login"} />
        : <Outlet />
    );
};