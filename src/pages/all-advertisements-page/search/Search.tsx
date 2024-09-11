import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { selectAdvertisementsSearchQuery } from "../../../features/advertisements/advertisementsSelectors.ts";
import style from "./Search.module.css";
import { setSearchQuery } from "../../../features/advertisements/advertisementsSlice.ts";
import DropdownButton from "../../../shared/components/dropdown-button/DropdownButton.tsx";

const Search = () => {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const searchQuery = useSelector(selectAdvertisementsSearchQuery);
    const [inputValue, setInputValue] = useState<string>(searchQuery);

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

            if (query !== searchQuery) {
                dispatch(setSearchQuery(query));
            }
        }, import.meta.env.VITE_REQUEST_DELAY || 1000);

        setTimeoutId(newTimeoutId);
    }, [timeoutId, location.search, navigate, dispatch, searchQuery]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const queryFromUrl = searchParams.get('search') || '';

        if (queryFromUrl !== inputValue) {
            setInputValue(queryFromUrl);
            if (queryFromUrl !== searchQuery) {
                dispatch(setSearchQuery(queryFromUrl));
            }
        }
    }, [location.search, dispatch, searchQuery]);

    return (
        <DropdownButton
            buttonText="Поиск"
            dropdownContent={
                <input
                    type="search"
                    placeholder="Поиск"
                    value={inputValue}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className={style.searchInput}
                />
            }
            active={searchQuery.length > 0}
        />
    );
};

export default Search;
