import {AdvertisementBase, Filters} from "./types.ts";

const BASE_URL = import.meta.env.VITE_API_URL;

const request = async (
    endpoint: string,
    method: string = 'GET',
    data?: unknown,
    signal?: AbortSignal
) => {
    try {
        const response = await fetch(`${BASE_URL}/${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: data ? JSON.stringify(data) : undefined,
            signal,
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error(`Error ${method} ${endpoint}:`, error);
        throw error;
    }
};

export const getAdvertisements = async (
    page: number,
    pageSize: number,
    searchQuery: string,
    filters: Filters,
    signal?: AbortSignal
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

    return request(`advertisements?${filterParams.toString()}`, 'GET', undefined, signal);
};

export const getAdvertisement = async (id: string, signal?: AbortSignal) => {
    return request(`advertisements/${id}`, 'GET', undefined, signal);
};

export const addAdvertisement = async (data: AdvertisementBase, signal?: AbortSignal) => {
    return request('advertisements', 'POST', data, signal);
};

export const putAdvertisement = async (id: string, data: AdvertisementBase, signal?: AbortSignal) => {
    return request(`advertisements/${id}`, 'PUT', data, signal);
};

export const removeAdvertisement = async (id: string, signal?: AbortSignal) => {
    return request(`advertisements/${id}`, 'DELETE', undefined, signal);
};
