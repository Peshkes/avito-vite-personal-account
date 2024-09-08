import { Routes, Route } from 'react-router-dom';
import AllAdvertismentsPage from "../../pages/AllAdvertismentsPage";
import NotFoundPage from "../../pages/NotFoundPage";
import AdvertismentPage from "../../pages/AdvertismentPage";
import OrdersPage from "../../pages/OrdersPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<AllAdvertismentsPage/>}/>
            <Route path="/advertisment/:Id" element={<AdvertismentPage/>}/>
            <Route path="/orders" element={<OrdersPage/>}/>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
};

export default AppRoutes;
