import {createAsyncThunk} from '@reduxjs/toolkit';
import {addAdvertisement, getAdvertisement, getAdvertisements,
    putAdvertisement, removeAdvertisement} from "./advertisementsApi.ts";
import {AdvertisementBase} from "./types.ts";

export const fetchAdvertisements = createAsyncThunk(
    'advertisements/getAdvertisements',
    async ({page, pageSize}: { page: number; pageSize: number }) => {
        return await getAdvertisements(page, pageSize);
    }
);

export const fetchAdvertisement = createAsyncThunk(
    'advertisements/getAdvertisement',
    async (id: string) => {
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
    async ({id, advertisment}: { id: string; advertisment: AdvertisementBase }) => {
        return await putAdvertisement(id, advertisment);
    }
);

export const deleteAdvertisement = createAsyncThunk(
    'advertisements/deleteAdvertisement',
    async (id: string) => {
        return await removeAdvertisement(id);
    }
);
