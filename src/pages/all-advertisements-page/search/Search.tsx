import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectAdvertisementsSearchQuery } from "../../../features/advertisements/advertisementsSelectors.ts";
import style from "./Search.module.css";
import { setSearchQuery } from "../../../features/advertisements/advertisementsSlice.ts";

const Search = () => {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const searchQuery = useSelector(selectAdvertisementsSearchQuery);
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState<string>(searchQuery);
    const buttonStyle = searchQuery.length > 0 ? style.active : style.inactive;

    const handleSearchChange = useCallback((query: string) => {
        setInputValue(query);

        if (timeoutId) clearTimeout(timeoutId);

        const newTimeoutId = setTimeout(() => {
            const searchParams = new URLSearchParams(location.search);
            if (query) {
                searchParams.set('search', query);
            } else {
                searchParams.delete('search');
            }
            navigate(`?${searchParams.toString()}`);

            // Отправляем действие только если новое значение отличается от текущего
            if (query !== searchQuery) {
                dispatch(setSearchQuery(query));
            }
        }, import.meta.env.VITE_REQUEST_DELAY || 1000);

        setTimeoutId(newTimeoutId);
    }, [timeoutId, location.search, navigate, dispatch, searchQuery]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryFromUrl = searchParams.get('search') || '';

        // Обновляем состояние только если новое значение отличается от текущего
        if (queryFromUrl !== inputValue) {
            setInputValue(queryFromUrl);
            if (queryFromUrl !== searchQuery) {
                dispatch(setSearchQuery(queryFromUrl));
            }
        }
    }, [location.search, dispatch, searchQuery, inputValue]);

    return (
        <div className={style.container} onMouseLeave={() => setIsOpen(false)}>
            <button
                className={`${style.button} ${buttonStyle}`}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
            >
                Поиск
            </button>
            {isOpen && (
                <div className={style.dropdown}>
                    <input
                        type="search"
                        placeholder="Поиск"
                        value={inputValue}
                        onChange={(e) => handleSearchChange(e.target.value)}
                    />
                </div>
            )}
        </div>
    );
};

export default Search;
