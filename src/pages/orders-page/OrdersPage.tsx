import CardOrderGenerator from "./orders-card/OrderCardGenerator.tsx";
import Gallery from "../../shared/components/gallery/Gallery.tsx";
import OrderFilter from "./orders-filter/OrderFilter.tsx";
import OrderSorter from "./orders-sorter/OrderSorter.tsx";
import OrdersPagination from "./OrdersPagination.tsx";
import PageLayout from "../../shared/components/page-layout/PageLayout.tsx";

const OrdersPage = () => {
    return (
        <PageLayout title="Все заказы"
            settingsContent={<><OrderSorter/><OrderFilter/></>}>
            <Gallery>
                <CardOrderGenerator/>
            </Gallery>
            <OrdersPagination/>
        </PageLayout>
    );
};

export default OrdersPage;
