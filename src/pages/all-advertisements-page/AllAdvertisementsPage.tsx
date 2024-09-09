import {useAppDispatch} from "../../app/store.ts";
import {useEffect} from "react";
import {fetchAdvertisements} from "../../features/advertisements/advertisementsAsynkFunctions.tsx";
import {
    selectAdvertisements,
    selectAdvertisementsFilters,
    selectAdvertisementsPageNumber,
    selectAdvertisementsPageSize,
    selectAdvertisementsSearchQuery
} from "../../features/advertisements/advertisementsSelectors.ts";
import {useSelector} from "react-redux";
import AdvertisementCard from "./advertisements-card/AdvertismentCard.tsx";
import Pagination from "./pagination/Pagination.tsx";
import Gallery from "../../shared/components/gallery/Gallery.tsx";
import PageSizer from "./page-sizer/PageSizer.tsx";
import style from './AllAdvertisementsPage.module.css';
import Filter from "./filter/Filter.tsx";
import Search from "./search/Search.tsx";

const AllAdvertisementsPage = () => {
    const dispatch = useAppDispatch();
    const advertisements = useSelector(selectAdvertisements);
    const pageSize = useSelector(selectAdvertisementsPageSize);
    const page = useSelector(selectAdvertisementsPageNumber);
    const searchQuery = useSelector(selectAdvertisementsSearchQuery);
    const filters = useSelector(selectAdvertisementsFilters);

    useEffect(() => {
        dispatch(fetchAdvertisements({page, pageSize, searchQuery, filters}));
    }, [dispatch, page, pageSize, searchQuery, filters]);

    const toShow = advertisements.length > pageSize ? advertisements.slice(0, -1) : advertisements;

    return (
        <main className={style.container}>
            <div className={style.header}>
                <h1>Все объявления</h1>
                <PageSizer/>
                <Search/>
                <Filter/>
            </div>
            <Gallery>
                <>
                    {toShow.length > 0 ? toShow.map((ad, index) => (
                        <AdvertisementCard
                            key={index}
                            imageUrl={ad.imageUrl || ''}
                            name={ad.name}
                            price={ad.price}
                            views={ad.views}
                            likes={ad.likes}
                        />
                    )) : <>
                        <h3>Ничего не найдено</h3>
                    </>}
                </>
            </Gallery>
            <Pagination/>
        </main>
    );
};

export default AllAdvertisementsPage;
