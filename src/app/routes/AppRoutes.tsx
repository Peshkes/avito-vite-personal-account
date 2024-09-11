import { Routes, Route } from 'react-router-dom';
import AllAdvertisementsPage from "../../pages/all-advertisements-page/AllAdvertisementsPage.tsx";
import NotFoundPage from "../../pages/not-fount-page/NotFoundPage.tsx";
import AdvertisementPage from "../../pages/advertisement-page/AdvertisementPage.tsx";
import OrdersPage from "../../pages/orders-page/OrdersPage.tsx";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AllAdvertisementsPage/>}/>
            <Route path="/advertisement/:id" element={<AdvertisementPage/>}/>
            <Route path="/orders/:id" element={<OrdersPage/>}/>
            <Route path="/orders" element={<OrdersPage/>}/>
            <Route path="/error" element={<NotFoundPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default AppRoutes;
