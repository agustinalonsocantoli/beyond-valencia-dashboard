import { Navigate, Route, Routes } from "react-router-dom";
import { RequireAuth } from "../RequireAuth/RequireAuth";
import { useAuthContex } from "../../context/auth.context";
import { Login } from "../../../pages/Login/Login";
import { Heading } from "@chakra-ui/react";
import { Experiences } from "../../../pages/Experiences/Experiences";

export const RouterController = () => {
    const { user } = useAuthContex();

    return (
        <Routes>
            <Route path='/login' element={!user.auth ? <Login /> : <Navigate to={"/experiences"} />} />

            <Route element={<RequireAuth />}>
                <Route path='experiences/*' element={<Experiences />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='daytrips/*' element={<Heading>Daytrips</Heading>} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='food/*' element={<Heading>Food</Heading>} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='lockers/*' element={<Heading>Lockers</Heading>} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='bikes/*' element={<Heading>Bikes</Heading>} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='content/*' element={<Heading>Content</Heading>} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='multimedia/*' element={<Heading>Multimedia</Heading>} />
            </Route>


            <Route element={<RequireAuth />}>
                <Route path='codes/*' element={<Heading>Codes</Heading>} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='usuario/*' element={<Heading>User</Heading>} />
            </Route>
        </Routes>
    );
};