import {useAppDispatch} from "../app/store.ts";
import {useEffect} from "react";
import {fetchAdvertisements} from "../features/advertisements/advertisementsAsynkFunctions.tsx";
import {selectAdvertisements} from "../features/advertisements/advertisementsSelectors.ts";
import {useSelector} from "react-redux";

const AllAdvertisementsPage = () => {
    const dispatch = useAppDispatch();
    const advertisements = useSelector(selectAdvertisements);

    useEffect(() => {
        dispatch(fetchAdvertisements({page: 1, pageSize: 10}));
    }, []);

    return (
        <main>
            <h1>Все объявления</h1>
            {advertisements.map((advertisement) => (<p key={advertisement.id}>{advertisement.name}</p>))}
        </main>
    );
};

export default AllAdvertisementsPage;
