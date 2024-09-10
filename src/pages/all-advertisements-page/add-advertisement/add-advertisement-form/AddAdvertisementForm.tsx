import React, { useState } from 'react';
import styles from './AddAdvertisementForm.module.css';
import { useAppDispatch } from "../../../../app/store.ts";
import {
    createAdvertisement,
    fetchAdvertisements
} from "../../../../features/advertisements/advertisementsAsynkFunctions.tsx";
import {
    selectAdvertisementsFilters,
    selectAdvertisementsPageNumber,
    selectAdvertisementsPageSize, selectAdvertisementsSearchQuery
} from "../../../../features/advertisements/advertisementsSelectors.ts";
import {useSelector} from "react-redux";

const defaultState = {
    imageUrl: '',
    name: '',
    description: '',
    price: 0
}

const AddAdvertisementForm = () => {
    const dispatch = useAppDispatch();
    const [formData, setFormData] = useState(defaultState);
    const page = useSelector(selectAdvertisementsPageNumber);
    const pageSize = useSelector(selectAdvertisementsPageSize);
    const searchQuery = useSelector(selectAdvertisementsSearchQuery);
    const filters = useSelector(selectAdvertisementsFilters);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(createAdvertisement(formData));
        setFormData(defaultState);
        dispatch(fetchAdvertisements({page, pageSize, searchQuery, filters}));
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label htmlFor="imageUrl" className={styles.label}>Картинка</label>
                <input
                    type="url"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Введите URL изображения"
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Название</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Введите название"
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="description" className={styles.label}>Описание</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className={styles.textarea}
                    placeholder="Введите описание"
                    required
                />
            </div>

            <div className={styles.formGroup}>
                <label htmlFor="price" className={styles.label}>Стоимость</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className={styles.input}
                    placeholder="Введите стоимость"
                    required
                />
            </div>

            <button type="submit" className={styles.submitButton}>Добавить объявление</button>
        </form>
    );
};

export default AddAdvertisementForm;
