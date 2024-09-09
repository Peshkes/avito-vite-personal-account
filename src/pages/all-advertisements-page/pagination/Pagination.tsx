import { useDispatch, useSelector } from 'react-redux';
import {
    selectAdvertisements,
    selectAdvertisementsPageNumber, selectAdvertisementsPageSize
} from "../../../features/advertisements/advertisementsSelectors.ts";
import {setPage} from "../../../features/advertisements/advertisementsSlice.ts";
import style from './Pagination.module.css';
import {useEffect} from "react";

const Pagination = () => {
    const dispatch = useDispatch();
    const page = useSelector(selectAdvertisementsPageNumber);
    const pageSize = useSelector(selectAdvertisementsPageSize);
    const advertisements = useSelector(selectAdvertisements);

    useEffect(() => {
        if (advertisements.length === 0) dispatch(setPage(1));
    }, [advertisements.length]);


    const handleNext = () => {
        dispatch(setPage(page + 1));
    };

    const handlePrevious = () => {
        if (page > 1) dispatch(setPage(page - 1));
    };

    return (
        <div className={style.pagination}>
            <button onClick={handlePrevious} disabled={page === 1}>←</button>
            <span>{page}</span>
            <button onClick={handleNext} disabled={advertisements.length <= pageSize}>→</button>
        </div>
    );
};

export default Pagination;
