import {createAsyncThunk} from '@reduxjs/toolkit';
import {
    addAdvertisement,
    getAdvertisement,
    getAdvertisements,
    putAdvertisement,
    removeAdvertisement
} from "./advertisementsApi.ts";
import {AdvertisementBase, Filters} from "./types.ts";

export const fetchAdvertisements = createAsyncThunk(
    'advertisements/getAdvertisements',
    async ({page, pageSize, searchQuery, filters, signal}: {
        page: number;
        pageSize: number;
        searchQuery: string;
        filters: Filters;
        signal: AbortSignal;
    }, {rejectWithValue}) => {
        try {
            return await getAdvertisements(page, pageSize, searchQuery, filters, signal);
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    return rejectWithValue('Fetching advertisements request was aborted');
                } else {
                    return rejectWithValue('Error fetching advertisements: ' + error.message);
                }
            } else {
                return rejectWithValue('Unknown error fetching advertisements');
            }
        }
    }
);

export const fetchAdvertisement = createAsyncThunk(
    'advertisements/getAdvertisement',
    async ({id, signal}: { id: string, signal: AbortSignal }, {rejectWithValue}) => {
        try {
            return await getAdvertisement(id, signal);
        } catch (error) {
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    return rejectWithValue('Fetching advertisement request was aborted');
                } else {
                    return rejectWithValue('Error fetching advertisement: ' + error.message);
                }
            } else {
                return rejectWithValue('Unknown error fetching advertisement');
            }
        }
    }
);

export const createAdvertisement = createAsyncThunk(
    'advertisements/createAdvertisement',
    async (advertisement: AdvertisementBase , {rejectWithValue}) => {
        try {
            return await addAdvertisement(advertisement);
        } catch (error) {
            if (error instanceof Error)
                return rejectWithValue('Error creating advertisement: ' + error.message);
            else
                return rejectWithValue('Unknown error creating advertisement');
        }
    }
);

export const updateAdvertisement = createAsyncThunk(
    'advertisements/updateAdvertisement',
    async ({id, advertisement}: {
        id: string;
        advertisement: AdvertisementBase;
    }, {rejectWithValue}) => {
        try {
            return await putAdvertisement(id, advertisement);
        } catch (error) {
            if (error instanceof Error)
                return rejectWithValue('Error updating advertisement: ' + error.message);
            else
                return rejectWithValue('Unknown error updating advertisement');
        }
    }
);

export const deleteAdvertisement = createAsyncThunk(
    'advertisements/deleteAdvertisement',
    async (id: string , {rejectWithValue}) => {
        try {
            return await removeAdvertisement(id);
        } catch (error) {
            if (error instanceof Error)
                return rejectWithValue('Error deleting advertisement: ' + error.message);
            else
                return rejectWithValue('Unknown error deleting advertisement');
        }
    }
);
