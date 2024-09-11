import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { SortingData, SortType } from '../../../features/orders/types.ts';
import style from './OrderSorter.module.css';
import { setSort } from '../../../features/orders/ordersSlice.ts';
import { selectOrdersSort } from "../../../features/orders/ordersSelectors.ts";
import Button from "../../../shared/ui/button/Button.tsx";

const parseSortFromSearchParams = (searchParams: URLSearchParams): SortType | undefined => {
    const sortId = searchParams.get('sort');
    if (sortId) {
        return SortingData.find(item => item.id === Number(sortId));
    }
    return undefined;
};

const OrderFilter = () => {
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const reduxSort = useSelector(selectOrdersSort);

    const [sort, setSortState] = useState<SortType | undefined>(parseSortFromSearchParams(searchParams));

    useEffect(() => {
        const newSort = parseSortFromSearchParams(searchParams);
        setSortState(newSort);

        if (JSON.stringify(newSort) !== JSON.stringify(reduxSort)) {
            dispatch(setSort(newSort));
        }
    }, [location.search]);

    const handleSortChange = (id: number) => {
        const newSort = SortingData.find(item => item.id === id);
        if (newSort) {
            setSortState(newSort);

            const searchParams = new URLSearchParams(location.search);
            searchParams.set('sort', id.toString());
            navigate(`?${searchParams.toString()}`);
        }
    };

    const activeSort = sort || null;

    const buttonStyle = activeSort !== null ? style.active : style.inactive;

    return (
        <div className={style.filterContainer} onMouseLeave={() => setIsOpen(false)}>
            <button
                className={`${style.filterButton} ${buttonStyle}`}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
            >
                {activeSort
                    ? `Сортировка (${SortingData.find(item => item.id === activeSort.id)?.name})`
                    : 'Сортировка'}
            </button>
            {isOpen && (
                <div className={style.filterDropdown}>
                    <h3>Сортировка</h3>
                    <div className={style.filterOptions}>
                        {SortingData.map(({ id, name }) => (
                            <label key={id}>
                                <input
                                    type="radio"
                                    name="sortOrder"
                                    checked={activeSort?.id === id}
                                    onChange={() => handleSortChange(id)}
                                />
                                {name}
                            </label>
                        ))}
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
