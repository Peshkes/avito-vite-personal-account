import React, { useState } from 'react';
import style from './OrderCard.module.css';
import {Link} from "react-router-dom";

type OrderItem = {
    id: any;
    name: string;
    count: number;
};

type OrderCardProps = {
    id: string;
    items: Array<OrderItem>;
    total: number;
    createdAt: string;
    status: string;
};

const OrderCard: React.FC<OrderCardProps> = ({ id, items, total, createdAt, status }) => {
    const [showItems, setShowItems] = useState(false);

    const toggleItems = () => {
        setShowItems(!showItems);
    };

    return (
        <div className={style.card}>
            <div className={style.content}>
                <h2 className={style.title}>Номер заказа: {id}</h2>
                <p className={style.info}>Статус: {status}</p>
                <p className={style.info}>Дата создания: {new Date(createdAt).toLocaleDateString()}</p>
                <p className={style.info}>Количество товаров: {items.length}</p>
                <p className={style.price}>Стоимость: {total} ₽</p>
                <button className={style.button} onClick={toggleItems}>
                    {showItems ? 'Скрыть товары' : 'Показать все товары'}
                </button>
                <div className={`${style.items} ${showItems ? style.show : ''}`}>
                    {items.map((item, index) => (
                        <div key={index} className={`${style.item} `}>
                            <Link to={`/advertisement/${item.id}`}>
                                {item.name} (x{item.count})
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
