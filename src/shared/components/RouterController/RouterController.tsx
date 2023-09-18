import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "../RequireAuth/RequireAuth";
import { useAuthContex } from "../../context/auth.context";
import { Login } from "../../../pages/Login/Login";
import { Heading } from "@chakra-ui/react";
import { Experiences } from "../../../pages/Experiences/Experiences";
import { Codes } from "../../../pages/Codes/Codes";
import { Partners } from "../../../pages/Partners/Partners";
import { Content } from "../../../pages/Content/Content";
import { Multimedia } from "../../../pages/Multimedia/Multimedia";
import { Bikes } from "../../../pages/Bikes/Bikes";
import { Lockers } from "../../../pages/Lockers/Lockers";
import { Daytrips } from "../../../pages/Daytrips/Daytrips";
import { Events } from "../../../pages/Events/Events";
import { validateRol } from "../../utils/rol";

export const RouterController = () => {
    const { user } = useAuthContex();

    return (
        <Routes>
            <Route path='/login' element={!user.auth ? <Login /> : <Navigate to={"/experiences"} />} />

            <Route element={
                    <RequireAuth 
                        isRoleAllowed={
                            validateRol(["admin", "partner"], user?.rol)
                        }
                    />
                }
            >
                <Route path='/*' element={<Navigate to={"/experiences"} />} />
            </Route>

            <Route element={
                    <RequireAuth 
                        isRoleAllowed={
                            validateRol(["admin", "partner"], user?.rol)
                        }
                    />
                }
            >
                <Route path='experiences/*' element={<Experiences />} />
            </Route>

            <Route element={
                    <RequireAuth 
                        isRoleAllowed={
                            validateRol(["admin", "partner"], user?.rol)
                        }
                    />
                }
            >
                <Route path='daytrips/*' element={<Daytrips />} />
            </Route>

            {/* <Route element={
                        <RequireAuth 
                            isRoleAllowed={
                                validateRol(["admin"], user?.rol)
                            }
                        />
                }
            >
                <Route path='food/*' element={<Heading>Food</Heading>} />
            </Route> */}

            <Route element={
                    <RequireAuth 
                        isRoleAllowed={
                            validateRol(["admin", "partner"], user?.rol)
                        }
                    />
                }
            >
                <Route path='events/*' element={<Events />} />
            </Route>

            <Route element={
                    <RequireAuth 
                        isRoleAllowed={
                            validateRol(["admin"], user?.rol)
                        }
                    />
                }
            >
                <Route path='lockers/*' element={<Lockers />} />
            </Route>

            <Route element={
                    <RequireAuth 
                        isRoleAllowed={
                            validateRol(["admin"], user?.rol)
                        }
                    />
                }
            >
                <Route path='bikes/*' element={<Bikes />} />
            </Route>

            <Route element={
                    <RequireAuth 
                        isRoleAllowed={
                            validateRol(["admin"], user?.rol)
                        }
                    />
                }
            >
                <Route path='content/*' element={<Content />} />
            </Route>

            <Route element={
                    <RequireAuth 
                        isRoleAllowed={
                            validateRol(["admin"], user?.rol)
                        }
                    />
                }
            >
                <Route path='multimedia/*' element={<Multimedia />} />
            </Route>


            <Route element={
                    <RequireAuth 
                        isRoleAllowed={
                            validateRol(["admin"], user?.rol)
                        }
                    />
                }
            >
                <Route path='codes/*' element={<Codes />} />
            </Route>

            <Route element={
                    <RequireAuth 
                        isRoleAllowed={
                            validateRol(["admin"], user?.rol)
                        }
                    />
                }
            >
                <Route path='partners/*' element={<Partners />} />
            </Route>

            {/* <Route element={
                        <RequireAuth 
                            isRoleAllowed={
                                validateRol(["admin"], user?.rol)
                            }
                        />
                }
            >
                <Route path='usuario/*' element={<Heading>User</Heading>} />
            </Route> */}
        </Routes>
    );
};