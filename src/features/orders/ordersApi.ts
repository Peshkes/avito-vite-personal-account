import {OrderStatusValue, SortType} from "./types.ts";
import {sendRequest} from "../../shared/templates.ts";

export const getOrders = async (
    page: number,
    pageSize: number,
    signal: AbortSignal,
    status?: OrderStatusValue,
    sort?: SortType
) => {
    const start = (page - 1) * pageSize;
    const filterParams = new URLSearchParams();
    filterParams.append('_start', start.toString());
    filterParams.append('_limit', (pageSize + 1).toString());

    if (sort) {
        filterParams.append('_sort', sort.field);
        filterParams.append('_order', sort.direction);
    }

    if (status || status === 0) filterParams.append('status', status.toString());

    return sendRequest(`orders?${filterParams.toString()}`, 'GET', undefined, signal);
};

export const getOrder = async (id: string, signal: AbortSignal) => {
    return sendRequest(`orders/${id}`, 'GET', undefined, signal);
};
