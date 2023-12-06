import { Outlet, Route, Routes } from "react-router-dom";
import NavbarMain from "../HomePage/navBarMainPage";
import HomePage from "../HomePage/HomePage";
import AboutPage from "../HomePage/AboutPage";
import HomeLogin from "../HomePage/HomeLogin";
import HomeForgotPassword from "../HomePage/HomeForgotPassword";
import UserParkingLotView from "../HomePage/UserParkingLotView";

import App from "../AdminPage/AppBar";
import CreateUser from '../AdminPage/CreateUser';
import SearchUser from '../AdminPage/SearchUser';
import SearchResult from '../AdminPage/SearchResult';
import ParkingSlots from '../AdminPage/ParkingSlots';
import RtlBldgPage from "../AdminPage/ParkingSlotPage/RTLBLDGPage";
import NgeBldgPage from "../AdminPage/ParkingSlotPage/NGEBLDGPage";
import GleBldgPage from "../AdminPage/ParkingSlotPage/GLEBLDGPage";
import BackGatePage from "../AdminPage/ParkingSlotPage/BACKGATEPage";
import LibraryPage from "../AdminPage/ParkingSlotPage/LIBRARYPage";
import BackGateHPage from "../HomePage/ParkingLotPage/BACKGateHPage";
import RtlBldgHPage from "../HomePage/ParkingLotPage/RTLBLDGHPage";
import NgeBldgHPage from "../HomePage/ParkingLotPage/NGEBLDGHPage";
import GleBldgHPage from "../HomePage/ParkingLotPage/GLEBLDGHPage";
import LibraryHPage from "../HomePage/ParkingLotPage/LIBRARYHPage";

import SekyuDashboard from "../SecurityPage/sekyuDashboard";
import SekyuBackgate from "../SecurityPage/sekyuBackGateHPage";
import SekyuGLE from "../SecurityPage/sekyuGLEBLDGHPage";
import SekyuLibrary from "../SecurityPage/sekyuLIBRARYHPage";
import SekyuNGE from "../SecurityPage/sekyuNGEBLDGHPage";
import SekyuRTL from "../SecurityPage/sekyuRTLBLDGHPage";
import SekyuSearch from "../SecurityPage/sekyuSearchUser";
import SekyuResult from "../SecurityPage/sekyuSearchResult";

export default function ParkCitRouter() {
    return (
        <>
            <NavbarMain />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Outlet />}>
                    <Route index element={<HomePage />} />
                    <Route path="/home/login" element={<HomeLogin />} />
                    <Route path="/home/forgotPassword" element={<HomeForgotPassword />} />
                </Route>
                <Route path="/about" element={<AboutPage />} />
                <Route path="/parkingLotView" element={<Outlet />}>
                    <Route index element={<UserParkingLotView />} />
                    <Route path="/parkingLotView/rtl" element={<RtlBldgHPage />} />
                    <Route path="/parkingLotView/nge" element={<NgeBldgHPage />} />
                    <Route path="/parkingLotView/gle" element={<GleBldgHPage />} />
                    <Route path="/parkingLotView/backgate" element={<BackGateHPage />} />
                    <Route path="/parkingLotView/library" element={<LibraryHPage />} />
                </Route>

                <Route path="/admin" element={<Outlet />}>
                    <Route index element={<App />} />
                    <Route path="/admin/create-user" element={<CreateUser />} />
                    <Route path="/admin/search-user" element={<SearchUser />} />
                    <Route path="/admin/search-result" element={<SearchResult />} />
                    <Route path="/admin/parking-slots" element={<ParkingSlots />} />
                    <Route path="/admin/parking-slots" element={<Outlet />}>
                        <Route index element={<ParkingSlots />} />
                        <Route path="/admin/parking-slots/rtl" element={<RtlBldgPage />} />
                        <Route path="/admin/parking-slots/nge" element={<NgeBldgPage />} />
                        <Route path="/admin/parking-slots/gle" element={<GleBldgPage />} />
                        <Route path="/admin/parking-slots/backgate" element={<BackGatePage />} />
                        <Route path="/admin/parking-slots/library" element={<LibraryPage />} />
                    </Route>
                </Route>

                <Route path="/sekyu" element={<Outlet />}>
                    <Route index element={<SekyuDashboard />} />
                    <Route path="/sekyu/rtl" element={<SekyuRTL />} />
                    <Route path="/sekyu/nge" element={<SekyuNGE />} />
                    <Route path="/sekyu/gle" element={<SekyuGLE  />} />
                    <Route path="/sekyu/backgate" element={<SekyuBackgate />} />
                    <Route path="/sekyu/library" element={<SekyuLibrary />} />
                </Route>

                <Route path="/sekyuNav" element={<Outlet />}>
                    <Route index element={<App />} />
                    <Route path="SearchUser" element={<SekyuSearch />} />
                    <Route path="/sekyuNav/SearchResult" element={<SekyuResult />} />
                </Route>
            </Routes>
            
            
        </>)
}
