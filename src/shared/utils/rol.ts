export interface RolInt {
    _id: string;
    name: "admin" | "partner"
}

export const assignRol = (rol: RolInt[]): "admin" | "partner" => {
    let userRol = null;

    if(!rol || rol?.length == 0) return userRol = "partner"
    
    rol?.forEach((r: RolInt) => {
        if(r.name === "admin") userRol = "admin"
    })

    if(userRol === null) return userRol = "partner"
    else return userRol
}

export const validateRol = (rolesAllowed: string[], currentRole: string | null): boolean => {
    if (!currentRole) return false;
    else return rolesAllowed.includes(currentRole);
};