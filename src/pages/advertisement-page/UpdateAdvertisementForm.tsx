import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {useAppDispatch} from "../../app/store.ts";
import {selectAdvertisement} from "../../features/advertisements/advertisementsSelectors.ts";
import {deleteAdvertisement, fetchAdvertisement, updateAdvertisement} from "../../features/advertisements/advertisementsAsynkFunctions.tsx";
import TextInput from "../../shared/ui/text-input/TextInput.tsx";
import Form from "../../shared/ui/form/Form.tsx";
import Textarea from "../../shared/ui/textarea/Textarea.tsx";
import FormButton from "../../shared/ui/form-button/FormButton.tsx";
import {useNavigate} from "react-router-dom";
import Loader from "../../shared/components/loader/Loader.tsx";

type Props = {
    id: string;
};

const defaultState = {
    imageUrl: '',
    name: '',
    description: '',
    price: 0,
};

const UpdateAdvertisementForm: React.FC<Props> = ({ id }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const advertisement = useSelector(selectAdvertisement);
    const [formData, setFormData] = useState(defaultState);
    const [loading, setLoading] = useState(true); // Добавляем состояние загрузки
    const [abortController, setAbortController] = useState<AbortController | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        setAbortController(controller);
        const {signal} = controller;

        if (!advertisement) {
            dispatch(fetchAdvertisement({ id, signal }))
                .finally(() => setLoading(false));
        } else {
            setFormData({
                imageUrl: advertisement.imageUrl || '',
                name: advertisement.name || '',
                description: advertisement.description || '',
                price: advertisement.price || 0,
            });
            setLoading(false);
        }

        return () => {
            if (abortController) abortController.abort();
        };
    }, [advertisement, id, dispatch]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const controller = new AbortController();
        setAbortController(controller);
        const { signal } = controller;
        setLoading(true);
        dispatch(updateAdvertisement({ id, advertisement: formData }))
            .finally(() => {
                setFormData(defaultState);
                dispatch(fetchAdvertisement({ id, signal }))
                    .finally(() => setLoading(false));
            });
    };

    const handleRemove = () => {
        dispatch(deleteAdvertisement(id));
        setFormData(defaultState);
        navigate('/');
    };

    return (
        <>
            {loading ? (
                <Loader/>
            ) : (
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
                    <FormButton type="submit">Обновить объявление</FormButton>
                    <FormButton type="button" onClick={handleRemove}>Удалить</FormButton>
                </Form>
            )}
        </>
    );
};

export default UpdateAdvertisementForm;
