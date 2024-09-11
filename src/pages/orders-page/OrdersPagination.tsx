import {useDispatch, useSelector} from "react-redux";
import {setPage} from "../../features/advertisements/advertisementsSlice.ts";
import Pagination from "../../shared/components/pagination/Pagination.tsx";
import {selectOrders, selectOrdersPageNumber, selectOrdersPageSize} from "../../features/orders/ordersSelectors.ts";

const OrdersPagination = () => {
    const dispatch = useDispatch();
    const page = useSelector(selectOrdersPageNumber);
    const pageSize = useSelector(selectOrdersPageSize);
    const orders = useSelector(selectOrders);

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
    };

    return (
        <>
            <Pagination
                currentPage={page}
                pageSize={pageSize}
                totalItems={orders.length}
                changePage={handlePageChange}
            />
        </>
    );
};

export default OrdersPagination;
