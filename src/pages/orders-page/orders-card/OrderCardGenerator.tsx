import React, {useEffect, useState} from 'react';
import OrderCard from './OrderCard.tsx'; // импортируем компонент для карточки заказа
import {useSelector} from 'react-redux';
import {
    selectOrders,
    selectOrdersFilters,
    selectOrdersPageNumber,
    selectOrdersPageSize,
    selectOrdersSort
} from '../../../features/orders/ordersSelectors.ts'; // предполагаемые селекторы
import {useParams} from 'react-router-dom';
import {useAppDispatch} from '../../../app/store.ts';
import Loader from "../../../shared/components/loader/Loader.tsx";
import {fetchOrders} from "../../../features/orders/ordersAsyncFuncions.ts";
import {getStatusText} from "../../../features/orders/types.ts";

const CardOrderGenerator: React.FC = () => {
    const {id} = useParams();
    const orders = useSelector(selectOrders);
    const pageSize = useSelector(selectOrdersPageSize);
    let toShow = orders.length > pageSize ? orders.slice(0, -1) : orders;
    if (id) toShow = toShow.filter(order => order.items.some(item => item.id === id));

    const dispatch = useAppDispatch();
    const page = useSelector(selectOrdersPageNumber);
    const filters = useSelector(selectOrdersFilters);
    const sort = useSelector(selectOrdersSort);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const {signal} = controller;
        setLoading(true);
        dispatch(fetchOrders({page, pageSize, signal, status: filters, sort}))
            .finally(() => {
                setLoading(false);
            });
        return () => controller.abort();
    }, [dispatch, page, pageSize, filters, id, sort]);

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <>
                    {toShow.length !== 0 ? (
                        <>
                            {toShow.map((order, index) => (
                                <OrderCard
                                    key={index}
                                    id={order.id}
                                    items={order.items}
                                    total={order.total}
                                    createdAt={order.createdAt}
                                    status={getStatusText(order.status)}
                                />
                            ))}
                        </>
                    ) : (
                        <h3>Заказы не найдены</h3>
                    )}
                </>
            )}
        </>
    );
};

export default CardOrderGenerator;
