import {SortType} from "./types.ts";
import {sendRequest} from "../../shared/templates.ts";

export const getOrders = async (
    page: number,
    pageSize: number,
    signal: AbortSignal,
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

    return sendRequest(`orders?${filterParams.toString()}`, 'GET', undefined, signal);
};

export const getOrder = async (id: string, signal: AbortSignal) => {
    return sendRequest(`orders/${id}`, 'GET', undefined, signal);
};
