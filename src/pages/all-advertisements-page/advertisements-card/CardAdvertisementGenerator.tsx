import React, { useEffect, useState } from 'react';
import AdvertisementCard from './AdvertismentCard.tsx';
import { useSelector } from 'react-redux';
import {
    selectAdvertisements, selectAdvertisementsFilters, selectAdvertisementsPageNumber,
    selectAdvertisementsPageSize, selectAdvertisementsSearchQuery
} from '../../../features/advertisements/advertisementsSelectors.ts';
import Button from '../../../shared/ui/button/Button.tsx';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/store.ts';
import { fetchAdvertisements } from '../../../features/advertisements/advertisementsAsyncFunctions.ts';
import Loader from "../../../shared/components/loader/Loader.tsx";

const CardAdvertisementGenerator: React.FC = () => {
    const navigate = useNavigate();
    const advertisements = useSelector(selectAdvertisements);
    const pageSize = useSelector(selectAdvertisementsPageSize);
    const toShow = advertisements.length > pageSize ? advertisements.slice(0, -1) : advertisements;

    const dispatch = useAppDispatch();
    const page = useSelector(selectAdvertisementsPageNumber);
    const searchQuery = useSelector(selectAdvertisementsSearchQuery);
    const filters = useSelector(selectAdvertisementsFilters);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;
        setLoading(true);
        dispatch(fetchAdvertisements({ page, pageSize, searchQuery, filters, signal }))
            .finally(() => {
                setLoading(false);
            });
        return () => controller.abort();
    }, [dispatch, page, pageSize, searchQuery, filters]);

    return (
        <>
            {loading ? (
                <Loader />
            ) : (
                <>
                    {toShow.length !== 0 ? (
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
                                />
                            ))}
                        </>
                    ) : (
                        <>
                            <h3>Ничего не найдено</h3>
                            <Button onClick={() => navigate('/')}>Очистить фильтры</Button>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default CardAdvertisementGenerator;
