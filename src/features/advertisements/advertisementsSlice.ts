import {createSlice} from "@reduxjs/toolkit";
import {fetchAdvertisement, fetchAdvertisements} from "./advertisementsAsynkFunctions.tsx";
import {AdvertisementState} from "./types.ts";

const initialState: AdvertisementState = {
    list: [],
    current: undefined,
    page: 1,
    pageSize: 10,
    status: undefined,
    error: undefined,
};

const advertisementsSlice = createSlice({
    name: 'advertisements',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAdvertisements.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAdvertisements.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.list = action.payload;
            })
            .addCase(fetchAdvertisements.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(fetchAdvertisement.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAdvertisement.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.current = action.payload;
            })
            .addCase(fetchAdvertisement.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default advertisementsSlice.reducer;
