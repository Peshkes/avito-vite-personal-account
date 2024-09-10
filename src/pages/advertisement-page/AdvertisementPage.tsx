import {useSelector} from "react-redux";
import {selectAdvertisement} from "../../features/advertisements/advertisementsSelectors.ts";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {fetchAdvertisement} from "../../features/advertisements/advertisementsAsynkFunctions.tsx";
import {useAppDispatch} from "../../app/store.ts";
import style from "./AdvertisementPage.module.css";
import useModal from "../../shared/components/modal-window/useModal.tsx";
import UpdateAdvertisementForm from "./UpdateAdvertisementForm.tsx";

const AdvertisementPage = () => {
    const dispatch = useAppDispatch();
    const advertisement = useSelector(selectAdvertisement);
    const {id} = useParams();
    const {handleOpenModal, ModalComponent} = useModal(<UpdateAdvertisementForm id={id as string}/>);

    useEffect(() => {
        if (advertisement === undefined || advertisement.id !== id) dispatch(fetchAdvertisement(id as string))
    }, []);

    return (
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
    );
};

export default AdvertisementPage;
