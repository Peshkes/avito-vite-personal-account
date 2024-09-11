import { useDispatch, useSelector } from 'react-redux';
import {
    selectAdvertisements,
    selectAdvertisementsPageNumber,
    selectAdvertisementsPageSize
} from "../../features/advertisements/advertisementsSelectors.ts";
import {setPage} from "../../features/advertisements/advertisementsSlice.ts";
import Pagination from "../../shared/components/pagination/Pagination.tsx";

const AllAdvertisementsPagination = () => {
    const dispatch = useDispatch();
    const page = useSelector(selectAdvertisementsPageNumber);
    const pageSize = useSelector(selectAdvertisementsPageSize);
    const advertisements = useSelector(selectAdvertisements);

    const handlePageChange = (page: number) => {
        dispatch(setPage(page));
    };

    return (
        <>
            <Pagination
                currentPage={page}
                pageSize={pageSize}
                totalItems={advertisements.length}
                changePage={handlePageChange}
            />
        </>
    );
};

export default AllAdvertisementsPagination;
