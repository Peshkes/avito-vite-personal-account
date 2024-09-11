import React from 'react';
import style from './AdvertisementCard.module.css';
import Eye from "../../../shared/images/Eye.tsx";
import Heart from "../../../shared/images/Heart.tsx";
import {useNavigate} from "react-router-dom";
import {getRandomImageURL} from "../../../shared/templates.ts";

type AdvertisementCardProps = {
    id: string;
    imageUrl: string;
    name: string;
    price: number;
    views: number;
    likes: number;
};

const AdvertisementCard: React.FC<AdvertisementCardProps> = ({id, imageUrl, name, price, views, likes}) => {
    const navigate = useNavigate();
    return (
        <div className={style.card + ' ' + 'clickable'} onClick={()=>navigate(`/advertisement/${id}`)}>
            <div className={style.imageBlock}>
                <img src={imageUrl || getRandomImageURL()} alt={name} className={style.image}/>
            </div>
            <div className={style.content}>
                <h2 className={style.title}>{name}</h2>
                <p className={style.price}>Стоимость: {price} ₽</p>
                <div className={style.stats}>
                    <div className={style.icon}>
                        <Eye size={25} color={"#7e7e7e"}/> <p>{views || 0}</p>
                    </div>
                    <div className={style.icon}>
                        <Heart size={25} color={"#7e7e7e"}/> <p>{likes || 0}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdvertisementCard;
