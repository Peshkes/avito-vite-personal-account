import React, {useState} from 'react';
import {useAppDispatch} from "../../../app/store.ts";
import {
    createAdvertisement,
    fetchAdvertisements
} from "../../../features/advertisements/advertisementsAsynkFunctions.tsx";
import {useSelector} from "react-redux";
import {
    selectAdvertisementsFilters, selectAdvertisementsPageNumber, selectAdvertisementsPageSize,
    selectAdvertisementsSearchQuery
} from "../../../features/advertisements/advertisementsSelectors.ts";
import TextInput from "../../../shared/ui/text-input/TextInput.tsx";
import Form from "../../../shared/ui/form/Form.tsx";
import FormButton from "../../../shared/ui/form-button/FormButton.tsx";
import Textarea from "../../../shared/ui/textarea/Textarea.tsx";

const defaultState = {
    imageUrl: '',
    name: '',
    description: '',
    price: 0,
};

const AddAdvertisementForm = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState(defaultState);
    const page = useSelector(selectAdvertisementsPageNumber);
    const pageSize = useSelector(selectAdvertisementsPageSize);
    const searchQuery = useSelector(selectAdvertisementsSearchQuery);
    const filters = useSelector(selectAdvertisementsFilters);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createAdvertisement(formData));
        setFormData(defaultState);
        dispatch(fetchAdvertisements({page, pageSize, searchQuery, filters}));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <TextInput
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                label="Картинка"
                placeholder="Введите URL изображения"
                onChange={handleChange}
            />
            <TextInput
                id="name"
                name="name"
                value={formData.name}
                label="Название"
                placeholder="Введите название"
                required
                onChange={handleChange}
            />
            <Textarea
                id="description"
                name="description"
                value={formData.description}
                label="Описание"
                placeholder="Введите описание"
                required
                onChange={handleChange}
            />
            <TextInput
                id="price"
                name="price"
                type="number"
                value={formData.price}
                label="Стоимость"
                placeholder="Введите стоимость"
                required
                onChange={handleChange}
            />
            <FormButton type="submit">Добавить объявление</FormButton>
        </Form>
    );
};

export default AddAdvertisementForm;
