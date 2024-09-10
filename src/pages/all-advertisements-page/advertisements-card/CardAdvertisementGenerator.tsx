import AdvertisementCard from "./AdvertismentCard.tsx";
import {useSelector} from "react-redux";
import {
    selectAdvertisements, selectAdvertisementsFilters, selectAdvertisementsPageNumber,
    selectAdvertisementsPageSize, selectAdvertisementsSearchQuery
} from "../../../features/advertisements/advertisementsSelectors.ts";
import Button from "../../../shared/ui/button/Button.tsx";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../app/store.ts";
import {useEffect} from "react";
import {fetchAdvertisements} from "../../../features/advertisements/advertisementsAsynkFunctions.tsx";

const CardAdvertisementGenerator = () => {
    const navigate = useNavigate();
    const advertisements = useSelector(selectAdvertisements);
    const pageSize = useSelector(selectAdvertisementsPageSize);
    const toShow = advertisements.length > pageSize ? advertisements.slice(0, -1) : advertisements;

    const dispatch = useAppDispatch();
    const page = useSelector(selectAdvertisementsPageNumber);
    const searchQuery = useSelector(selectAdvertisementsSearchQuery);
    const filters = useSelector(selectAdvertisementsFilters);

    useEffect(() => {
        dispatch(fetchAdvertisements({page, pageSize, searchQuery, filters}));
    }, [dispatch, page, pageSize, searchQuery, filters]);

    return (
        <>
            {toShow.length !== 0 ?
                <>
                    {toShow.map((ad, index) => (
                        <AdvertisementCard
                            key={index}
                            imageUrl={ad.imageUrl || ''}
                            name={ad.name}
                            price={ad.price}
                            views={ad.views}
                            likes={ad.likes}
                            id={ad.id}
                        />))

                    }
                </> :
                <>
                    <h3>Ничего не найдено</h3>
                    <Button onClick={() => navigate('/')}>Отчистить фиьтры</Button>
                </>
            }
        </>
    );
};

export default CardAdvertisementGenerator;
