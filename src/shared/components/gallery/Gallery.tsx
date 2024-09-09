import React from 'react';
import style from './Gallery.module.css';

type GalleryProps = {
    children: React.ReactNode;
};

const Gallery: React.FC<GalleryProps> = ({ children }) => {
    return <div className={style.gallery}>{children}</div>;
};

export default Gallery;
