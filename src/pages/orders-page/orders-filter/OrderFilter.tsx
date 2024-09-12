import {useEffect, useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useLocation, useNavigate} from 'react-router-dom';
import {OrderStatus, OrderStatusValue} from '../../../features/orders/types.ts';
import {setFilters} from '../../../features/orders/ordersSlice.ts';
import {selectOrdersFilters} from "../../../features/orders/ordersSelectors.ts";
import DropdownButton from "../../../shared/components/dropdown-button/DropdownButton.tsx";
import Button from "../../../shared/ui/button/Button.tsx";
import style from './OrderFilter.module.css';
import RadioButtonsList from "../../../shared/ui/radio-button-list/RadioButtonsList.tsx";


const parseOrderFiltersFromSearchParams = (searchParams: URLSearchParams): OrderStatusValue | undefined => {
    const status = searchParams.get('orderStatuses');
    return status ? Number(status) as OrderStatusValue : undefined;
};

const OrderFilter = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const reduxFilter = useSelector(selectOrdersFilters);

    const [filters, setFiltersState] = useState<OrderStatusValue | undefined>(parseOrderFiltersFromSearchParams(searchParams));

    useEffect(() => {
        const newFilters = parseOrderFiltersFromSearchParams(searchParams);
        if (newFilters !== filters) {
            setFiltersState(newFilters);
        }

        if (JSON.stringify(newFilters) !== JSON.stringify(reduxFilter)) {
            dispatch(setFilters(newFilters));
        }
    }, [location.search]);

    const handleStatusChange = (item: OrderStatusValue) => {
        setFiltersState(item);
        const searchParams = new URLSearchParams(location.search);
        searchParams.set('orderStatuses', item.toString());
        navigate(`?${searchParams.toString()}`);
    };

    const resetFilters = () => {
        setFiltersState(undefined);
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('orderStatuses');
        navigate(`?${searchParams.toString()}`);
    };

    const filterOptions = useMemo(() => Object.keys(OrderStatus).map(key => ({
        id: OrderStatus[key as keyof typeof OrderStatus],
        name: key
    })), []);

    return (
        <DropdownButton
            buttonText={filters !== undefined ? `Фильтр (${Object.keys(OrderStatus).find(key => OrderStatus[key as keyof typeof OrderStatus] === filters)})` : 'Фильтр'}
            dropdownContent={
                <div className={style.filterDropdown}>
                    <h3>Статус заказа</h3>
                    <RadioButtonsList<OrderStatusValue>
                        data={filterOptions}
                        activeOption={filters === 0 || filters ? {id: filters, name: ''} : null}
                        handleOptionChange={handleStatusChange}
                    />
                    <Button withArrow={false} onClick={resetFilters}>
                        Сбросить
                    </Button>
                </div>
            }
            active={filters !== undefined}
        />
    );
};

export default OrderFilter;
