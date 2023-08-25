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

export const RouterController = () => {
    const { user } = useAuthContex();

    return (
        <Routes>
            <Route path='/login' element={!user.auth ? <Login /> : <Navigate to={"/experiences"} />} />

            <Route element={<RequireAuth />}>
                <Route path='/' element={<Navigate to={"/experiences"} />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='experiences/*' element={<Experiences />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='daytrips/*' element={<Daytrips />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='food/*' element={<Heading>Food</Heading>} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='events/*' element={<Heading>Events</Heading>} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='lockers/*' element={<Lockers />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='bikes/*' element={<Bikes />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='content/*' element={<Content />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='multimedia/*' element={<Multimedia />} />
            </Route>


            <Route element={<RequireAuth />}>
                <Route path='codes/*' element={<Codes />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='partners/*' element={<Partners />} />
            </Route>

            <Route element={<RequireAuth />}>
                <Route path='usuario/*' element={<Heading>User</Heading>} />
            </Route>
        </Routes>
    );
};