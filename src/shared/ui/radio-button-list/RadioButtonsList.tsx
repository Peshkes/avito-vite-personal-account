import style from './RadioButtonsList.module.css';
import {OrderStatusValue} from "../../../features/orders/types.ts";

type RadioOption<T> = {
    id: T;
    name: string;
};

type RadioButtonsListProps<T> = {
    data: RadioOption<T>[];
    activeOption: RadioOption<T> | null;
    handleOptionChange: (item: T) => void;
};

const RadioButtonsList = <T extends number | OrderStatusValue>({data, activeOption, handleOptionChange}: RadioButtonsListProps<T>) => {
    return (
        <div className={style.filterOptions}>
            {data.map(({ id, name }) => (
                <label key={id} className={style.radio_descr}>
                    <input
                        className={style.cart_input_radio}
                        type="radio"
                        name={name}
                        checked={activeOption?.id === id}
                        onChange={() => handleOptionChange(id)}
                    />
                    <span className={style.custom_radio}></span>
                    {name}
                </label>
            ))}
        </div>
    );
};

export default RadioButtonsList;
