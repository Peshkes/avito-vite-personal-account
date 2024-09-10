import {createAsyncThunk} from '@reduxjs/toolkit';
import {addAdvertisement, getAdvertisement, getAdvertisements,
    putAdvertisement, removeAdvertisement} from "./advertisementsApi.ts";
import {AdvertisementBase, Filters} from "./types.ts";

export const fetchAdvertisements = createAsyncThunk(
    'advertisements/getAdvertisements',
    async ({page, pageSize, searchQuery, filters}: { page: number; pageSize: number; searchQuery: string; filters: Filters }) => {
        return await getAdvertisements(page, pageSize, searchQuery, filters);
    }
);

export const fetchAdvertisement = createAsyncThunk(
    'advertisements/getAdvertisement',
    async (id: string) => {
        console.log(id);
        return await getAdvertisement(id);
    }
);

export const createAdvertisement = createAsyncThunk(
    'advertisements/createAdvertisement',
    async (advertisement: AdvertisementBase) => {
        return await addAdvertisement(advertisement);
    }
);

export const updateAdvertisement = createAsyncThunk(
    'advertisements/updateAdvertisement',
    async ({id, advertisement}: { id: string; advertisement: AdvertisementBase }) => {
        return await putAdvertisement(id, advertisement);
    }
);

export const deleteAdvertisement = createAsyncThunk(
    'advertisements/deleteAdvertisement',
    async (id: string) => {
        return await removeAdvertisement(id);
    }
);
