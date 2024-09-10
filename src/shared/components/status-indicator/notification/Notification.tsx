import React from 'react';
import styles from './Notification.module.css';
import {Status} from "../../../../features/advertisements/types.ts";

type NotificationProps = {
    message: string;
    onClose: () => void;
    style?: React.CSSProperties;
    type: Status
};

const Notification = ({ message, onClose, style, type }: NotificationProps) => {
    if (type)
    return (
        <div className={`${styles.notification} ${styles[type]}`} style={style}>
            <span>{message}</span>
            <button onClick={onClose} className={styles.closeButton}>×</button>
        </div>
    );
    else
        return null;
};

export default Notification;
