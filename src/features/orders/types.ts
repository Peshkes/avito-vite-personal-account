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
    name: string;
    field: keyof Order;
    direction: 'asc' | 'desc';
}

export type Sorting = Array<SortType>;

export const SortingData: Sorting = [
    {name: 'Цена по возрастанию', field: 'total', direction: 'desc'},
    {name: 'Цена по убыванию', field: 'total', direction: 'asc'},
] as const;
