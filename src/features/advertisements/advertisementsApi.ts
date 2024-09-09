import {AdvertisementBase, Filters} from "./types.ts";
import logo from "../../shared/images/Logo.tsx";

const BASE_URL = import.meta.env.VITE_API_URL;

export const getAdvertisements = async (
    page: number,
    pageSize: number,
    searchQuery: string,
    filters: Filters
) => {
    try {
        const start = (page - 1) * pageSize;
        const filterParams = new URLSearchParams();
        filterParams.append('_start', start.toString());
        filterParams.append('_limit', (pageSize + 1).toString());

        // Поиск
        if (searchQuery) {
            filterParams.append('name_like', searchQuery);
        }

        // Price Range
        if (filters.priceRange.min !== 0) {
            filterParams.append('price_gte', filters.priceRange.min.toString());
        }
        if (filters.priceRange.max !== undefined) {
            filterParams.append('price_lte', filters.priceRange.max.toString());
        }

        // Views Range
        if (filters.viewsRange.min !== 0) {
            filterParams.append('views_gte', filters.viewsRange.min.toString());
        }
        if (filters.viewsRange.max !== undefined) {
            filterParams.append('views_lte', filters.viewsRange.max.toString());
        }

        // Likes Range
        if (filters.likesRange.min !== 0) {
            filterParams.append('likes_gte', filters.likesRange.min.toString());
        }
        if (filters.likesRange.max !== undefined) {
            filterParams.append('q', filters.likesRange.max.toString());
        }

        const response = await fetch(`${BASE_URL}/advertisements?${filterParams.toString()}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        console.log(`${BASE_URL}/advertisements?${filterParams.toString()}`);
        console.log(response);
        return await response.json();
    } catch (error) {
        console.error('Error fetching advertisements:', error);
        throw error;
    }
};

export const getAdvertisement = async (id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/advertisements/${id}`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching advertisement:', error);
        throw error;
    }
};

export const addAdvertisement = async (data: AdvertisementBase) => {
    try {
        const response = await fetch(`${BASE_URL}/advertisements`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error creating advertisement:', error);
        throw error;
    }
};

export const putAdvertisement = async (id: string, data: AdvertisementBase) => {
    try {
        const response = await fetch(`${BASE_URL}/advertisements/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error updating advertisement:', error);
        throw error;
    }
};

export const removeAdvertisement = async (id: string) => {
    try {
        const response = await fetch(`${BASE_URL}/advertisements/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error deleting advertisement:', error);
        throw error;
    }
};
