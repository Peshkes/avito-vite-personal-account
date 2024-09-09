import {createSlice} from "@reduxjs/toolkit";
import {fetchAdvertisement, fetchAdvertisements} from "./advertisementsAsynkFunctions.tsx";
import {AdvertisementState, Filters} from "./types.ts";

export const defaultFilters: Filters = {
    priceRange: { min: 0, max: undefined },
    viewsRange: { min: 0, max: undefined },
    likesRange: { min: 0, max: undefined }
};

const initialState: AdvertisementState = {
    list: [],
    current: undefined,
    page: 1,
    pageSize: 10,
    searchQuery: '',
    filters: defaultFilters,
    status: undefined,
    error: undefined,
};

const advertisementsSlice = createSlice({
    name: 'advertisements',
    initialState,
    reducers: {
        setPage(state, action) {
            state.page = action.payload;
        },
        setPageSize(state, action) {
            state.pageSize = action.payload;
        },
        setSearchQuery(state, action) {
            state.searchQuery = action.payload;
        },
        setFilters(state, action) {
            state.filters = action.payload;
        }
    },
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

export const {setPage, setPageSize, setSearchQuery, setFilters} = advertisementsSlice.actions;
export default advertisementsSlice.reducer;
