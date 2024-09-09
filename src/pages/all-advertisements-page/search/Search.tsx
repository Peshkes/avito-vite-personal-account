import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectAdvertisementsSearchQuery} from "../../../features/advertisements/advertisementsSelectors.ts";
import style from "./Search.module.css";
import {setSearchQuery} from "../../../features/advertisements/advertisementsSlice.ts";

const Search = () => {
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const searchQuery = useSelector(selectAdvertisementsSearchQuery);
    const buttonStyle = searchQuery.length > 0 ? style.active : style.inactive;

    const handleFilterChange = useCallback((query: string) => {
        if (timeoutId) clearTimeout(timeoutId);
        setTimeoutId(setTimeout(() => {
            dispatch(setSearchQuery(query));
        }, import.meta.env.VITE_REQUEST_DELAY || 1000));
    }, [dispatch, searchQuery]);

    return (
        <div className={style.container} onMouseLeave={() => setIsOpen(false)}>
            <button
                className={`${style.button} ${buttonStyle}`}
                onClick={() => setIsOpen(!isOpen)}
                onMouseEnter={() => setIsOpen(true)}
            >Поиск</button>
            {isOpen && <div className={style.dropdown}>
                <input type="search" placeholder="Поиск" defaultValue={searchQuery} onChange={(e) => handleFilterChange(e.target.value)}/>
            </div>}
        </div>
    );
};

export default Search;
