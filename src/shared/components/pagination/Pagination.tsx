import style from './Pagination.module.css';
import {useEffect} from 'react';

type PaginationProps = {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    changePage: (page: number) => void;
};

const Pagination = ({currentPage, pageSize, totalItems, changePage}: PaginationProps) => {

    useEffect(() => {
        if (totalItems === 0) changePage(1);
    }, [totalItems, changePage]);

    const handleNext = () => {
        if (currentPage < Math.ceil(totalItems / pageSize)) {
            changePage(currentPage + 1);
        }
    };

    const handlePrevious = () => {
        if (currentPage > 1) {
            changePage(currentPage - 1);
        }
    };

    return (
        <div className={style.pagination}>
            <button onClick={handlePrevious} disabled={currentPage === 1}>←</button>
            <span>{currentPage}</span>
            <button onClick={handleNext} disabled={currentPage >= Math.ceil(totalItems / pageSize)}>→</button>
        </div>
    );
};

export default Pagination;
