import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { SortingData, SortType } from '../../../features/orders/types.ts';
import { setSort } from '../../../features/orders/ordersSlice.ts';
import { selectOrdersSort } from "../../../features/orders/ordersSelectors.ts";
import RadioButtonsList from "../../../shared/ui/radio-button-list/RadioButtonsList.tsx";
import DropdownButton from "../../../shared/components/dropdown-button/DropdownButton.tsx";
import Button from "../../../shared/ui/button/Button.tsx";
import style from './OrderSorter.module.css';

const parseSortFromSearchParams = (searchParams: URLSearchParams): SortType | undefined => {
    const sortId = searchParams.get('sort');
    return sortId ? SortingData.find(item => item.id === Number(sortId)) : undefined;
};

const OrderSorter = () => {
    const dispatch = useDispatch();
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

    const handleSortChange = (item: number) => {
        const newSort = SortingData.find(sortType => sortType.id === item);
        if (newSort) {
            setSortState(newSort);

            const searchParams = new URLSearchParams(location.search);
            searchParams.set('sort', item.toString());
            navigate(`?${searchParams.toString()}`);
        }
    };

    const resetSort = () => {
        setSortState(undefined);
        const searchParams = new URLSearchParams(location.search);
        searchParams.delete('sort');
        navigate(`?${searchParams.toString()}`);
    };

    const activeSort = sort || null;

    return (
        <DropdownButton
            buttonText={activeSort
                ? `Сортировка (${SortingData.find(item => item.id === activeSort.id)?.name})`
                : 'Сортировка'}
            dropdownContent={
                <div className={style.filterDropdown}>
                    <h3>Сортировка</h3>
                    <RadioButtonsList
                        data={SortingData}
                        activeOption={activeSort}
                        handleOptionChange={handleSortChange}
                    />
                    <Button withArrow={false} onClick={resetSort}>
                        Сбросить
                    </Button>
                </div>
            }
            active={activeSort !== null}
        />
    );
};

export default OrderSorter;
