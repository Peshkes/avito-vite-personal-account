import {selectAdvertisementsPageSize} from "../../../features/advertisements/advertisementsSelectors.ts";
import {useDispatch, useSelector} from "react-redux";
import style from './PageSizer.module.css';
import {setPageSize} from "../../../features/advertisements/advertisementsSlice.ts";
import {useCallback, useState} from "react";

const PageSizer = () => {
    const dispatch = useDispatch();
    const pageSize = useSelector(selectAdvertisementsPageSize);
    const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const handlePageSizeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        setTimeoutId(setTimeout(() => {
            dispatch(setPageSize(Number(e.target.value)));
        }, import.meta.env.VITE_REQUEST_DELAY || 1000));
    }, [dispatch, timeoutId]);
    return (
        <div className={style.sizer}>
            <p>Количество объявлений на странице :</p>
            <input type="number" min={1} max={100} onChange={handlePageSizeChange} defaultValue={pageSize}/>
        </div>
    );
};

export default PageSizer;
