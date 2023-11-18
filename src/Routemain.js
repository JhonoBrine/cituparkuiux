
import { Outlet, Route, Routes } from "react-router-dom";
import NavbarMain from "./HomePage/navBarMainPage";
import HomePage from "./HomePage/HomePage";
import AboutPage from "./HomePage/AboutPage";
import ServicePage from "./HomePage/ServicePage";
import ContactPage from "./HomePage/ContactPage";
import HomeLogin from "./HomePage/HomeLogin";
import HomeForgotPassword from "./HomePage/HomeForgotPassword";

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
            <Route path="/service" element={<ServicePage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>

        </Routes>
    </>)
}