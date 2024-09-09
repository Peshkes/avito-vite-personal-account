import { Routes, Route } from 'react-router-dom';
import AllAdvertisementsPage from "../../pages/all-advertisements-page/AllAdvertisementsPage.tsx";
import NotFoundPage from "../../pages/not-fount-page/NotFoundPage.tsx";
import AdvertisementsPage from "../../pages/advertisement-page/AdvertisementsPage.tsx";
import OrdersPage from "../../pages/OrdersPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AllAdvertisementsPage/>}/>
            <Route path="/advertisment/:Id" element={<AdvertisementsPage/>}/>
            <Route path="/orders" element={<OrdersPage/>}/>
            <Route path="/error" element={<NotFoundPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default AppRoutes;
