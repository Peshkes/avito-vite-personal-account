import {Advertisement} from "../advertisements/types.ts";

export const OrderStatus = {
    Created: 0,
    Paid: 1,
    Transport: 2,
    DeliveredToThePoint: 3,
    Received: 4,
    Archived: 5,
    Refund: 6
} as const;

export type OrderStatusValue = typeof OrderStatus[keyof typeof OrderStatus];

export const getStatusText = (status: OrderStatusValue): string => {
    const statusText = Object.keys(OrderStatus).find(key => OrderStatus[key as keyof typeof OrderStatus] === status);
    return statusText ? statusText : 'Unknown Status';
};


export type OrderItem = Advertisement & { count: number; };

export type Order = {
    id: string;
    status: typeof OrderStatus[keyof typeof OrderStatus];
    createdAt: string;
    finishedAt?: string;
    items: Array<OrderItem>;
    deliveryWay: string;
    total: number;
}

export type Image = {
    id: number;
    url: string;
    name: string;
}

export type SortType = {
    id: number;
    name: string;
    field: keyof Order;
    direction: 'asc' | 'desc';
}

export type Sorting = Array<SortType>;

export const SortingData: Sorting = [
    {id: 1, name: 'Цена по возрастанию', field: 'total', direction: 'asc'},
    {id: 2, name: 'Цена по убыванию', field: 'total', direction: 'desc'},
] as const;
