import {AdvertisementBase, Filters} from "./types.ts";
import {sendRequest} from "../../shared/templates.ts";

export const getAdvertisements = async (
    page: number,
    pageSize: number,
    searchQuery: string,
    filters: Filters,
    signal: AbortSignal
) => {
    const start = (page - 1) * pageSize;
    const filterParams = new URLSearchParams();
    filterParams.append('_start', start.toString());
    filterParams.append('_limit', (pageSize + 1).toString());

    if (searchQuery) filterParams.append('name_like', searchQuery);
    if (filters.priceRange.min !== 0) filterParams.append('price_gte', filters.priceRange.min.toString());
    if (filters.priceRange.max !== undefined) filterParams.append('price_lte', filters.priceRange.max.toString());
    if (filters.viewsRange.min !== 0) filterParams.append('views_gte', filters.viewsRange.min.toString());
    if (filters.viewsRange.max !== undefined) filterParams.append('views_lte', filters.viewsRange.max.toString());
    if (filters.likesRange.min !== 0) filterParams.append('likes_gte', filters.likesRange.min.toString());
    if (filters.likesRange.max !== undefined) filterParams.append('likes_lte', filters.likesRange.max.toString());

    return sendRequest(`advertisements?${filterParams.toString()}`, 'GET', undefined, signal);
};

export const getAdvertisement = async (id: string, signal: AbortSignal) => {
    return sendRequest(`advertisements/${id}`, 'GET',undefined, signal);
};

export const addAdvertisement = async (data: AdvertisementBase) => {
    return sendRequest('advertisements', 'POST', data);
};

export const putAdvertisement = async (id: string, data: AdvertisementBase) => {
    return sendRequest(`advertisements/${id}`, 'PUT', data);
};

export const removeAdvertisement = async (id: string) => {
    return sendRequest(`advertisements/${id}`, 'DELETE');
};
