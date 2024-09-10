// StatusIndicator.tsx
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAdvertisementsError,
    selectAdvertisementsStatus
} from '../../../features/advertisements/advertisementsSelectors.ts';
import Notification from './notification/Notification.tsx';
import styles from './StatusIndicator.module.css';
import {Status} from "../../../features/advertisements/types.ts";


const StatusIndicator = () => {
    const [notifications, setNotifications] = useState<{ message: string; type: Status }[]>([]);
    const status = useSelector(selectAdvertisementsStatus);
    const error = useSelector(selectAdvertisementsError);

    useEffect(() => {
        if (status || error) {
            if (status !== "loading") {
                const message = error ? `${status} - ${error}` : status || '';
                const type: Status = status === 'failed' ? 'failed' : 'succeeded';
                setNotifications(prev => [...prev, { message, type }]);

                setTimeout(() => {
                    setNotifications(prev => prev.slice(1));
                }, 2000);
            }
        }
    }, [status, error]);

    const handleClose = (index: number) => {
        setNotifications(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className={styles.container}>
            {notifications.map((notification, index) => (
                <Notification
                    key={index}
                    message={notification.message}
                    onClose={() => handleClose(index)}
                    style={{ bottom: `${index * 70}px` }} // Adjust spacing as needed
                    type={notification.type}
                />
            ))}
        </div>
    );
};

export default StatusIndicator;
