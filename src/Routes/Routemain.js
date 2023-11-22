
import { Outlet, Route, Routes } from "react-router-dom";
import NavbarMain from "../HomePage/navBarMainPage";
import HomePage from "../HomePage/HomePage";
import AboutPage from "../HomePage/AboutPage";

import HomeLogin from "../HomePage/HomeLogin";
import HomeForgotPassword from "../HomePage/HomeForgotPassword";
import AdminHomePage from "../AdminPage/AdminHomePage";
import UserParkingLotView from "../HomePage/UserParkingLotView";

export default function ParkCitRouter(){

    return(<>

        <NavbarMain/>
        <Routes>

            <Route path="/" element={<HomePage/>}/>
            <Route path="/home" element={<Outlet/>}>
                <Route index element={<HomePage/>}/>
                <Route path="/home/login" element={<HomeLogin/>}/>
                <Route path="/home/forgotPassword" element={<HomeForgotPassword/>}/>
            </Route>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/parkingLotView" element={<UserParkingLotView/>}/>

 
            <Route path="/admin" element={<AdminHomePage/>}/>

        </Routes>
    </>)
}