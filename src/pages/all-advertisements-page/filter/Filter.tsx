import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setFilters } from '../../../features/advertisements/advertisementsSlice.ts';
import { Filters } from '../../../features/advertisements/types.ts';
import style from './Filter.module.css';
import Button from "../../../shared/ui/button/Button.tsx";
import DropdownButton from "../../../shared/components/dropdown-button/DropdownButton.tsx";


const parseFiltersFromSearchParams = (searchParams: URLSearchParams): Filters => {
    return {
        priceRange: {
            min: Number(searchParams.get('priceMin')) || 0,
            max: Number(searchParams.get('priceMax')) || undefined,
        },
        viewsRange: {
            min: Number(searchParams.get('viewsMin')) || 0,
            max: Number(searchParams.get('viewsMax')) || undefined,
        },
        likesRange: {
            min: Number(searchParams.get('likesMin')) || 0,
            max: Number(searchParams.get('likesMax')) || undefined,
        },
    };
};

const Filter = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);

    const [filters, setFiltersState] = useState(parseFiltersFromSearchParams(searchParams));

    useEffect(() => {
        const newFilters = parseFiltersFromSearchParams(searchParams);
        setFiltersState(newFilters);
        if (JSON.stringify(newFilters) !== JSON.stringify(filters)) {
            dispatch(setFilters(newFilters));
        }
    }, [location.search]);

    const handleFilterChange =
        (type: keyof Filters, field: 'min' | 'max', value: number | undefined) => {
            setFiltersState((prevFilters) => ({
                ...prevFilters,
                [type]: {
                    ...prevFilters[type],
                    [field]: value,
                },
            }));
        };

    const handleActivateFilters = () => {
        if (
            (filters.priceRange.max && filters.priceRange.min > filters.priceRange.max) ||
            (filters.viewsRange.max && filters.viewsRange.min > filters.viewsRange.max) ||
            (filters.likesRange.max && filters.likesRange.min > filters.likesRange.max)
        ) {
            alert('Минимальные значения не могут быть больше максимальных!');
            return;
        }

        const searchParams = new URLSearchParams(location.search);

        Object.entries(filters).forEach(([key, range]) => {
            if (range.min !== undefined && range.min !== 0) {
                searchParams.set(`${key.slice(0, -5)}Min`, String(range.min));
            } else {
                searchParams.delete(`${key.slice(0, -5)}Min`);
            }

            if (range.max !== undefined) {
                searchParams.set(`${key.slice(0, -5)}Max`, String(range.max));
            } else {
                searchParams.delete(`${key.slice(0, -5)}Max`);
            }
        });

        navigate(`?${searchParams.toString()}`);
    };

    const activeFiltersCount = Object.values(filters).reduce(
        (count, filter) => (filter.min !== 0 || filter.max !== undefined ? count + 1 : count),
        0
    );

    const dropdownContent = (
        <>
            <div className={style.filterGroup}>
                <h3>Цена</h3>
                <div className={style.inputs}>
                    <input
                        type="number"
                        placeholder="Минимум"
                        value={filters.priceRange.min || ''}
                        min={0}
                        max={filters.priceRange.max}
                        onChange={(e) => handleFilterChange('priceRange', 'min', Number(e.target.value))}
                    />
                    <input
                        type="number"
                        placeholder="Максимум"
                        value={filters.priceRange.max || ''}
                        min={filters.priceRange.min || 0}
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
                        value={filters.viewsRange.min || ''}
                        min={0}
                        max={filters.viewsRange.max}
                        onChange={(e) => handleFilterChange('viewsRange', 'min', Number(e.target.value))}
                    />
                    <input
                        type="number"
                        placeholder="Максимум"
                        value={filters.viewsRange.max || ''}
                        min={filters.viewsRange.min || 0}
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
                        value={filters.likesRange.min || ''}
                        min={0}
                        max={filters.likesRange.max}
                        onChange={(e) => handleFilterChange('likesRange', 'min', Number(e.target.value))}
                    />
                    <input
                        type="number"
                        placeholder="Максимум"
                        value={filters.likesRange.max || ''}
                        min={filters.likesRange.min || 0}
                        onChange={(e) => handleFilterChange('likesRange', 'max', Number(e.target.value))}
                    />
                </div>
            </div>
            <Button withArrow={false} onClick={handleActivateFilters}>Применить</Button>
            <Button withArrow={false} onClick={() => navigate('/')}>Сбросить</Button>
        </>
    );

    return (
        <DropdownButton
            buttonText={activeFiltersCount > 0 ? `Фильтры (${activeFiltersCount})` : 'Фильтры'}
            dropdownContent={dropdownContent}
            active={activeFiltersCount > 0}
        />
    );
};

export default Filter;
