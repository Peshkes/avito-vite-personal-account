import { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFilters } from '../../../features/advertisements/advertisementsSlice.ts';
import { Filters } from '../../../features/advertisements/types.ts';
import style from './Filter.module.css';
import Button from "../../../shared/ui/button/Button.tsx";

const Filter = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state: { advertisements: { filters: Filters } }) => state.advertisements.filters);

    const [localFilters, setLocalFilters] = useState<Filters>(filters);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const id = setTimeout(() => {
            dispatch(setFilters(localFilters));
        }, import.meta.env.VITE_REQUEST_DELAY || 1000);
        setTimeoutId(id);

        return () => clearTimeout(id);
    }, [localFilters, dispatch]);

    useEffect(() => {
        setLocalFilters(filters);
    }, [filters]);

    const handleFilterChange = useCallback(
        (type: keyof Filters, field: 'min' | 'max', value: number | undefined) => {
            setLocalFilters((prevFilters) => ({
                ...prevFilters,
                [type]: {
                    ...prevFilters[type],
                    [field]: value,
                },
            }));
        },
        []
    );

    const activeFiltersCount = Object.values(localFilters).reduce(
        (count, filter) =>
            filter.min !== 0 || filter.max !== undefined ? count + 1 : count,
        0
    );

    const buttonStyle = activeFiltersCount > 0 ? style.active : style.inactive;

    return (
        <div className={style.filterContainer} onMouseLeave={() => setIsOpen(false)}>
            <button
                className={`${style.filterButton} ${buttonStyle}`}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
            >
                {activeFiltersCount > 0 ? `Фильтры (${activeFiltersCount})` : 'Фильтры'}
            </button>
            {isOpen && (
                <div className={style.filterDropdown}>
                    <div className={style.filterGroup}>
                        <h3>Цена</h3>
                        <div className={style.inputs}>
                            <input
                                type="number"
                                placeholder="Минимум"
                                value={localFilters.priceRange.min || ''}
                                onChange={(e) => handleFilterChange('priceRange', 'min', Number(e.target.value))}
                            />
                            <input
                                type="number"
                                placeholder="Максимум"
                                value={localFilters.priceRange.max || ''}
                                onChange={(e) => handleFilterChange('priceRange', 'max', Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className={style.filterGroup}>
                        <h3>Просмотры</h3>
                        <div className={style.inputs}>
                            <input
                                type="number"
                                placeholder="Минимум"
                                value={localFilters.viewsRange.min || ''}
                                onChange={(e) => handleFilterChange('viewsRange', 'min', Number(e.target.value))}
                            />
                            <input
                                type="number"
                                placeholder="Максимум"
                                value={localFilters.viewsRange.max || ''}
                                onChange={(e) => handleFilterChange('viewsRange', 'max', Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <div className={style.filterGroup}>
                        <h3>Лайки</h3>
                        <div className={style.inputs}>
                            <input
                                type="number"
                                placeholder="Минимум"
                                value={localFilters.likesRange.min || ''}
                                onChange={(e) => handleFilterChange('likesRange', 'min', Number(e.target.value))}
                            />
                            <input
                                type="number"
                                placeholder="Максимум"
                                value={localFilters.likesRange.max || ''}
                                onChange={(e) => handleFilterChange('likesRange', 'max', Number(e.target.value))}
                            />
                        </div>
                    </div>
                    <Button
                        withArrow={false}
                        onClick={() => {
                            const defaultFilters: Filters = {
                                priceRange: { min: 0, max: undefined },
                                viewsRange: { min: 0, max: undefined },
                                likesRange: { min: 0, max: undefined },
                            };
                            setLocalFilters(defaultFilters);
                            dispatch(setFilters(defaultFilters));
                        }}
                    >
                        Сбросить
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Filter;
