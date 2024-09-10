import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAdvertisement } from '../../features/advertisements/advertisementsSelectors.ts';
import { useParams } from 'react-router-dom';
import { fetchAdvertisement } from '../../features/advertisements/advertisementsAsyncFunctions.ts';
import { useAppDispatch } from '../../app/store.ts';
import style from './AdvertisementPage.module.css';
import useModal from '../../shared/components/modal-window/useModal.tsx';
import UpdateAdvertisementForm from './UpdateAdvertisementForm.tsx';
import Loader from "../../shared/components/loader/Loader.tsx";

const AdvertisementPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const advertisement = useSelector(selectAdvertisement);
    const { id } = useParams();
    const { handleOpenModal, ModalComponent } = useModal(<UpdateAdvertisementForm id={id as string} />);
    const [loading, setLoading] = useState(true); // Добавляем состояние загрузки

    useEffect(() => {
        const abortController = new AbortController();
        const { signal } = abortController;

        if (advertisement === undefined || advertisement.id !== id) {
            if (id) {
                dispatch(fetchAdvertisement({ id, signal }))
                    .finally(() => setLoading(false));
            }
        } else {
            setLoading(false);
        }

        return () => abortController.abort();
    }, [id, dispatch, advertisement]);

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
                <main className={style.container}>
                    <div className={style.imageBlock}>
                        <img src={advertisement?.imageUrl} alt={advertisement?.name} />
                    </div>
                    <div className={style.detailsBlock}>
                        <h1 className={style.title}>{advertisement?.name}</h1>
                        <p className={style.price}>{advertisement?.price}₽</p>
                        <p className={style.description}>{advertisement?.description}</p>
                        <div className={style.stats}>
                            <p>{advertisement?.views} просмотров</p>
                            <p>{advertisement?.likes} лайков</p>
                        </div>
                        <div className={style.buttons}>
                            <button className={style.editButton} onClick={handleOpenModal}>Редактировать</button>
                            <button className={style.ordersButton}>Заказы</button>
                        </div>
                    </div>
                    {ModalComponent}
                </main>
            )}
        </>
    );
};

export default AdvertisementPage;
