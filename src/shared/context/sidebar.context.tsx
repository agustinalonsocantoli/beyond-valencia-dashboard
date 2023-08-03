import React, { useContext } from "react";

export const SidebarView = React.createContext<{
    sidebarView: boolean;
    setSidebarView: ( action: any ) => void;
}>({
    sidebarView: true,
    setSidebarView: ( action: any ) => {},
});

export const useSidebarView = () => {
    return useContext(SidebarView);
}