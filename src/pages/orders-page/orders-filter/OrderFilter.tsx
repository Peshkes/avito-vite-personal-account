import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderStatus, OrderStatusValue } from '../../../features/orders/types.ts';
import style from './OrderFilter.module.css';
import Button from "../../../shared/ui/button/Button.tsx";
import { setFilters } from '../../../features/orders/ordersSlice.ts';
import { selectOrdersFilters } from "../../../features/orders/ordersSelectors.ts";

const parseOrderFiltersFromSearchParams = (searchParams: URLSearchParams): OrderStatusValue | undefined => {
    return searchParams.get('orderStatuses')
        ? Number(searchParams.get('orderStatuses')) as OrderStatusValue
        : undefined;
};

const OrderFilter = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const reduxFilter = useSelector(selectOrdersFilters);

    const [filters, setFiltersState] = useState<OrderStatusValue | undefined>(parseOrderFiltersFromSearchParams(searchParams));

    useEffect(() => {
        const newFilters = parseOrderFiltersFromSearchParams(searchParams);
        setFiltersState(newFilters);

        if (JSON.stringify(newFilters) !== JSON.stringify(reduxFilter)) {
            dispatch(setFilters(newFilters));
        }
    }, [location.search]);

    const handleStatusChange = (status: OrderStatusValue) => {
        setFiltersState(status);
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('orderStatuses', status.toString());
        navigate(`?${searchParams.toString()}`);
    };

    const activeFilter = filters || null;

    const buttonStyle = activeFilter !== null ? style.active : style.inactive;

    return (
        <div className={style.filterContainer} onMouseLeave={() => setIsOpen(false)}>
            <button
                className={`${style.filterButton} ${buttonStyle}`}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
            >
                {activeFilter !== null ? `Фильтр (${Object.keys(OrderStatus).find(key => OrderStatus[key as keyof typeof OrderStatus] === activeFilter)})` : 'Фильтр'}
            </button>
            {isOpen && (
                <div className={style.filterDropdown}>
                    <h3>Статус заказа</h3>
                    <div className={style.filterOptions}>
                        {Object.keys(OrderStatus).map(key => {
                            const status = OrderStatus[key as keyof typeof OrderStatus];
                            return (
                                <label key={status}>
                                    <input
                                        type="radio"
                                        name="orderStatus"
                                        checked={filters === status}
                                        onChange={() => handleStatusChange(status)}
                                    />
                                    {key}
                                </label>
                            );
                        })}
                    </div>
                    <Button
                        withArrow={false}
                        onClick={() => navigate('/orders/')}
                    >
                        Сбросить
                    </Button>
                </div>
            )}
        </div>
    );
};

export default OrderFilter;
