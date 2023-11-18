
import { Route, Routes } from "react-router-dom";
import NavbarMain from "./HomePage/navBarMainPage";
import HomePage from "./HomePage/HomePage";
import AboutPage from "./HomePage/AboutPage";
import ServicePage from "./HomePage/ServicePage";
import ContactPage from "./HomePage/ContactPage";
import App from "./App";

export default function ParkCitRouter(){

    return(<>
    
        <NavbarMain/>
        <Routes>

            <Route path="/" element={<HomePage/>}/>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/about" element={<AboutPage/>}/>
            <Route path="/service" element={<ServicePage/>}/>
            <Route path="/contact" element={<ContactPage/>}/>

        </Routes>
    </>)
}