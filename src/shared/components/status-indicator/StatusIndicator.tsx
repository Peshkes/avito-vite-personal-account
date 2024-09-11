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
import {selectOrdersError, selectOrdersStatus} from "../../../features/orders/ordersSelectors.ts";


const StatusIndicator = () => {
    const [notifications, setNotifications] = useState<{ message: string; type: Status }[]>([]);
    const statusAdvertisements = useSelector(selectAdvertisementsStatus);
    const errorAdvertisements = useSelector(selectAdvertisementsError);
    const statusOrders = useSelector(selectOrdersStatus);
    const errorOrders = useSelector(selectOrdersError);

    useEffect(() => {
        if (statusAdvertisements || errorAdvertisements) {
            if (statusAdvertisements !== "loading") {
                const message = errorAdvertisements ? `${statusAdvertisements} - ${errorAdvertisements}` : statusAdvertisements || '';
                const type: Status = statusAdvertisements === 'failed' ? 'failed' : 'succeeded';
                setNotifications(prev => [...prev, { message, type }]);

                setTimeout(() => {
                    setNotifications(prev => prev.slice(1));
                }, 2000);
            }
        }
    }, [statusAdvertisements, errorAdvertisements]);

    useEffect(() => {
        if (statusOrders || errorOrders) {
            if (statusOrders !== "loading") {
                const message = errorOrders ? `${statusOrders} - ${errorOrders}` : statusOrders || '';
                const type: Status = statusOrders === 'failed' ? 'failed' : 'succeeded';
                setNotifications(prev => [...prev, { message, type }]);

                setTimeout(() => {
                    setNotifications(prev => prev.slice(1));
                }, 2000);
            }
        }
    }, [statusOrders, errorOrders]);

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
