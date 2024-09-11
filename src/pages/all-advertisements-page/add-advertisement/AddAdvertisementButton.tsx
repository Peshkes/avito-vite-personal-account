import useModal from "../../../shared/components/modal-window/useModal.tsx";
import AddAdvertisementForm from "./AddAdvertisementForm.tsx";
import style from './AddAdvertisementButton.module.css';

const AddAdvertisementButton = () => {
    const {handleOpenModal, ModalComponent} = useModal(<AddAdvertisementForm/>);
    return (
        <div>
            <button className={style.addButton} onClick={() => handleOpenModal()}>Добавить</button>
            {ModalComponent}
        </div>
    );
};

export default AddAdvertisementButton;
